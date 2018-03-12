/**
 * 单例模式
 * 保证页面中只有一个实例
 */
;(function (win) {
    var confirmCallback=null,
       cancelCallback=null;
    /*构造函数*/
    var Modal=function (params) {
        if(!params.type){
            throw {
                name:TypeError,
                message:'弹框类型为必填'
            }
        }
        this.type=params.type;
        var confirmButtonText=params.confirmButtonText,
            cancelButtonText=params.cancleButtonText,
            message=params.message;
        this.title=params.title;
        this.confirmButtonText=confirmButtonText?confirmButtonText:"";
        this.cancelButtonText=cancelButtonText?cancelButtonText:"";
        this.message=message?message:'';
        confirmCallback=params.confirmCallback;
        cancelCallback=params.cancelCallback;
        /*如果是用户自定义弹窗*/
        if(this.type==="manual"){
            this.modalId=params.id;
            this.modalEl=params.html;
        }
        this.open=false;
        this.handleModalEl();
    };
    Modal.prototype.create=function () {
        if(!this.open){
            var modal=document.createElement('div');
            modal.classList.add('xh-modal-layer');
            modal.id=this.modalId;
            modal.innerHTML=this.modalEl;
            document.body.appendChild(modal);
            this.handleEvent();
            this.open=true;
        }
    };
    Modal.prototype.delete=function () {
        if(this.open){
            var modal=document.querySelector('#'+this.modalId);
            document.body.removeChild(modal);
            this.open=false;
        }
    };
    /*两种默认的弹框*/
    Modal.prototype.handleModalEl=function () {
        var confirmEl='<section class="modal-box">' +
            '<div class="content">' +
            '<h2 class="title">' +
            this.title +
            '</h2>' +
            '<p class="text">' +
            this.message +
            '</p>' +
            '<div class="btns">' +
            '<span class="cancel-btn">' + this.cancelButtonText + '</span>' +
            '<span class="confirm-btn">' + this.confirmButtonText + '</span>' +
            '</div>' +
            '</div>' +
            '</section>';
        var alertEl='<section class="modal-box">' +
            '<div class="content">' +
            '<h2 class="title">' +
            this.title +
            '</h2>' +
            '<p class="text">' +
            this.message +
            '</p>' +
            '<div class="btns">' +
            '<p class="confirm-btn">'+this.confirmButtonText+'</p>'+
            '</div>' +
            '</div>' +
            '</section>';
        if(this.type==="alert"){
            this.modalEl=alertEl;
            this.modalId=this.type;
        }else if(this.type==="confirm"){
            this.modalEl=confirmEl;
            this.modalId=this.type;
        }
    };
    /*处理点击事件*/
    Modal.prototype.handleEvent=function () {
        var _self=this;
        if(this.confirmButtonText){
            document.querySelector('.confirm-btn').onclick=function () {
                console.log(_self.delete);
                _self.delete();
                confirmCallback();
            }
        }
        
        if(this.cancelButtonText){
            document.querySelector('.cancel-btn').onclick=function () {
                _self.delete();
                cancelCallback();
            }
        }
    };
    /*闭包封装了 instance 私有变量*/
    win.initModal=(function () {
        var instance;
        return function (params) {
            return instance || (instance = new Modal(params))
        }
    })();
})(window);