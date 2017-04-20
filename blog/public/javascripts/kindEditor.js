// kind editor编辑器
var editor;
KindEditor.ready(function(K) {
    editor = K.create('textarea[name="post"]', {
      allowImageUpload: false,
      items: ['fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic','underline', 'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright','insertorderedlist', 'insertunorderedlist', '|', 'emoticons', 'image', 'link']
    });
});