/*!
*  UrOrbit Advance CSS Tool (urorbit.acss) : plugin for jQuery
*
* Developed by
* Bassam alessawi (@urorbit) - http://www.urorbit.com
* Dual licensed under the MIT or GPL Version 3 licenses.
*
* @link http://urorbit.com/tools/advance_css_jQuery/13256
* @author bassam alessawi
* @date 17/05/2013
* @version 1.0
*
*/


$.fn.urorbit_acss = function(){
    var arr_classes_not_show = ["ui-resizable-handle","ui-resizable-n","ui-resizable-e","ui-resizable-s","ui-resizable-w","ui-resizable-ne","ui-resizable-se","ui-resizable-sw","ui-resizable-nw","ui-icon", "ui-icon-gripsmall-diagonal-se","ui-resizable-autohide","rightclick","tooltip-right","tooltip-left"];
    var clss='#'+$(this).attr('id');
      var option_html="<option>"+clss+"</option>";
        var arr = new Array();
        var b=0;
        $(this).find('*').each(function(e){
            b++;
            if(jQuery.inArray(this.tagName, arr)== -1){
                arr[b]=this.tagName;
                if( this.tagName != 'STYLE' &&  this.tagName != 'SCRIPT') option_html=option_html+"<option>" + clss + " " + this.tagName+"</option>";
            }
            var lines = this.className.split(" ");
            $.each(lines, function(e) {
                b++;
                if(jQuery.inArray(lines[e], arr)== -1 && jQuery.inArray(lines[e],arr_classes_not_show) == -1){
                    arr[b]=lines[e];
                    if( lines[e] ) option_html=option_html+"<option>" + clss + " ." + lines[e] +"</option>";
                }
            });
            if(jQuery.inArray($(this).attr('id'), arr)== -1){
                arr[b]=$(this).attr('id');
                if( $(this).attr('id')) option_html=option_html+"<option>" + clss + " #" + $(this).attr('id')+"</option>";
            }
        });
        $("#all-styles").attr("title" , "groupCSS_"+ clss.replace(/[^a-zA-Z 0-9]+/g,''));
        $("#all-styles").html(option_html);
        $("#all-styles").val(clss);

       return css_div(clss);    
};


function css_div(clss){
var urorbit_css_map = ["color","font-family","font-size","font-style","font-variant","font-weight"
,"text-align","text-decoration","text-indent","letter-spacing","word-spacing","text-transform","vertical-align"
,"background-color","background-image","background-repeat","background-attachment","background-position"
,"border-top-color","border-top-style","border-top-width","border-left-color","border-left-style","border-left-width","border-right-color","border-right-style","border-right-width","border-bottom-color","border-bottom-style","border-bottom-width"
,"width","height","position","top","left","right","bottom","z-index","float","clear","margin-top","margin-left","margin-right","margin-bottom","padding-top","padding-left","padding-right","padding-bottom"
,"cursor","display","visibility","overflow"] ;
    
    if($("#"+$('#all-styles').attr("title")).length==0){
        $("#panel").append("<style id='"+$('#all-styles').attr("title")+"'></style>");
    }
    $(clss).animate({
        opacity: 0.50
    }, 250, function() {
        $(clss).animate({
            opacity: 1
        }, 250);
    });
    $("#styletypepos").text('Normal style');
    $("#label_div").html(clss);
    var css_ths='';
    var css_ths1='';
    $.each(urorbit_css_map, function() {
        // alert(this);
        var x=String(this);
        css_ths1 = $(clss).css(x)  ;
        css_ths = css_ths + x + ":" + css_ths1 + ";\n";
        if(x.indexOf("color") > -1 && css_ths1 != undefined){
           
            $("#"+x).css("background-color",css_ths1);
        }
        $("#"+x).val(css_ths1);
        $( "#"+x+'-p').css(x,css_ths1);
    });
 }



function make_css(id){ 
    var csstag=$("#label_div").text();
    var idval=$("#"+id).val();
    var csstn=csstag+"{"+id+":"+idval+";}";
    var oldcss=$("#"+$('#all-styles').attr("title")).text();
    
    csstag=csstag.replace (/\./g, '\\.') ;
    csstag=csstag.replace (/\#/g, '\\#') ;
    var re= new RegExp (csstag+"{"+id+":[a-zA-Z0-9-_:#.()/ ]+;}","\g");
    oldcss=oldcss.replace(re,'');
    $("#"+$('#all-styles').attr("title")).text(oldcss+" "+csstn);
}


// dom ready event
$(function() {
    $('.theme-group-content').hide();  
        // spindowns in TR panel
    $('.theme-group-header').click(function() {
	$('.theme-group-content').hide();			
        $(this).next().show(100);
});
    $('#save_css').click(function(){
        var xstr= $("#all-styles").attr("title");
        var cstr = $("#"+$("#all-styles").attr("title")).text();
        alert('ID:'+xstr +"\n style code:"+cstr);
    });

 
 $('#all-styles').change(function() {
        css_div($(this).val());
    });
                

       $('.urorbit_css').click(function() {        
        make_css($(this).attr("id"));
    });
    $('.urorbit_css').change(function() {
        make_css($(this).attr("id"));
    });
    $('.urorbit_counter').keydown(function(event) {
        var v=parseInt($(this).val());
        if(isNaN(v)) v=0;
        if(event.keyCode==38 || event.keyCode==39){
            v=v+1;
        }
        else if(event.keyCode==40 || event.keyCode==37){
            v=v-1;
        }
        $(this).val(v+'px');
        make_css($(this).attr("id"));
    });

 
});





