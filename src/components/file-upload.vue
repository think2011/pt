<template>
    <ul class="file-upload">
        <li :class="{empty:!value, 'hover-modal':value}">
            <div v-if="state === 'uploading'">
                <div class="actions">
                    正在上传 {{percent}}%
                </div>
            </div>

            <input type="file"
                   name="{{ name }}"
                   id="{{ id || name }}"
                   accept="{{ accept }}"
                   @click="fileInputClick"
                   @change="fileInputChange"
                   multiple="{{ multiple }}">

            <div class="actions">
                <a @click="value=''" href="javascript:">
                    {{errorMsg}} <i class="ui-icon material-icons">add_circle</i>
                </a>
            </div>
        </li>
    </ul>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    .file-upload {
        li {
            width: 100%;
            min-height: 150px;
            max-height: 300px;
            padding: 0;
            cursor: pointer;
            overflow: hidden;
            position: relative;
            display: flex;
            align-items: center;
            border-color: #ddd;

            .actions {
                width: 100%;
                height: 100%;
                align-items: center;
                justify-content: center;
                position: absolute;
                z-index: 2;
                top: 0;
                display: flex;

                a {
                    color: #999;
                    i {
                        font-size: 50px;
                    }
                }
            }

            &.empty {
                border-style: dashed;
                min-height: 150px;
                background: #fbfbfb;

                input {
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 3;
                    opacity: 0;
                }
            }

            &.hover-modal {
                position: relative;

                .actions {
                    display: none;

                    a {
                        color: #fff;

                        i {
                            font-size: 40px;
                        }
                    }
                }

                &:before {
                    content: ' ';
                    position: absolute;
                    z-index: 1;
                    background-color: gray;
                    -webkit-transition: all .3s ease;
                    transition: all .3s ease;
                    opacity: 0;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                }

                &:hover {
                    &:before {
                        opacity: .8;
                    }

                    .actions {
                        display: flex;
                    }
                }
            }
        }

        img {
            width: 100%;
            height: auto;
            max-width: 100%;
            display: block;
        }
    }

</style>

<script type="text/ecmascript-6">
    export default{
        props  : {
            name    : {
                type   : String,
                default: () => {
                    return `file-${Date.now()}`
                }
            },
            state   : {
                type   : String,
                default: () => {
                    return 'done'
                }
            },
            value   : {
                type : String,
                toWay: true
            },
            percent : 0,
            action  : {
                type    : String,
                required: true
            },
            accept  : String,
            multiple: String,
            headers : Object
        },
        data   : function () {
            return {
                myFiles : [], // a container for the files in our field
                errorMsg: null
            };
        },
        methods: {
            fileInputClick : function () {

                // click actually triggers after the file dialog opens
                this.$dispatch('onFileClick', this.myFiles);
            },
            fileInputChange: function () {
                // get the group of files assigned to this field
                var ident    = this.id || this.name
                this.myFiles = document.getElementById(ident).files;
                this.$dispatch('onFileChange', this.myFiles);

                this.fileUpload()
            },
            _onProgress    : function (e) {
                // this is an internal call in XHR to update the progress
                this.percent = e.percent = ((e.loaded / e.total) * 100).toFixed(0);
                this.$dispatch('onFileProgress', e);
            },
            _handleUpload  : function (file) {
                let that = this
                this.$dispatch('beforeFileUpload', file);
                var form = new FormData();
                var xhr  = new XMLHttpRequest();
                try {
                    form.append('Content-Type', file.type || 'application/octet-stream');
                    // our request will have the file in the ['file'] key
                    form.append('file', file);
                } catch (err) {
                    this.$dispatch('onFileError', file, err);
                    return;
                }

                return new Promise(function (resolve, reject) {

                    xhr.upload.addEventListener('progress', this._onProgress, false);

                    xhr.onreadystatechange = function () {
                        if (xhr.readyState < 4) {
                            return;
                        }
                        if (xhr.status < 400) {
                            var res      = JSON.parse(xhr.responseText);
                            that.value   = res.data.url
                            that.percent = 0
                            this.$dispatch('onFileUpload', file, res);
                            resolve(file);
                        } else {
                            var err        = JSON.parse(xhr.responseText);
                            err.status     = xhr.status;
                            err.statusText = xhr.statusText;
                            that.errorMsg  = err.errorMsg
                            this.$dispatch('onFileError', file, err);
                            reject(err);
                        }
                    }.bind(this);

                    xhr.onerror = function () {
                        var err        = JSON.parse(xhr.responseText);
                        err.status     = xhr.status;
                        err.statusText = xhr.statusText;
                        this.$dispatch('onFileError', file, err);
                        reject(err);
                    }.bind(this);

                    xhr.open('POST', this.action, true);
                    if (this.headers) {
                        for (var header in this.headers) {
                            xhr.setRequestHeader(header, this.headers[header]);
                        }
                    }
                    xhr.setRequestHeader('Accept', 'application/json,text/plain, */*');
                    xhr.send(form);
                    this.$dispatch('afterFileUpload', file);
                }.bind(this));
            },
            fileUpload     : function () {
                let that      = this
                that.state    = 'uploading'
                that.errorMsg = null

                if (this.myFiles.length > 0) {
                    // a hack to push all the Promises into a new array
                    var arrayOfPromises = Array.prototype.slice.call(this.myFiles, 0).map(function (file) {
                        return this._handleUpload(file);
                    }.bind(this));
                    // wait for everything to finish
                    Promise.all(arrayOfPromises).then(function (allFiles) {
                        this.$dispatch('onAllFilesUploaded', allFiles);
                    }.bind(this)).catch(function (err) {
                        this.$dispatch('onFileError', this.myFiles, err);
                    }.bind(this)).then(() => {
                        that.state = 'done'
                    })
                } else {
                    // someone tried to upload without adding files
                    var err = new Error("No files to upload for this field");
                    this.$dispatch('onFileError', this.myFiles, err);
                }
            }
        }
    }
</script>
