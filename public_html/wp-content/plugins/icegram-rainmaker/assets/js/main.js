jQuery(function(){jQuery.fn.bindFirst=function(a,b){this.bind(a,b);var c=this.data("events")||jQuery._data(this[0],"events"),d=c[a],e=d.splice(d.length-1)[0];d.splice(0,0,e)};var a=function(){};a.prototype={init:function(a){jQuery(a).closest(".rainmaker_form").length<1||jQuery(a).closest(".rainmaker_form").hasClass("rm_init_done")||(jQuery(a).find(".rm_required_field, .ig_form_required_field").length<1&&jQuery(a).append('<div style="position:absolute; left: -5000px"><input type="text" class="rm_required_field" value="" tabindex="-1"/></div>'),jQuery(a).closest(".rainmaker_form").addClass(jQuery(a).closest(".rainmaker_form").data("type")||""),jQuery(a).bindFirst("submit",function(a){window.rainmaker.addLead(a,jQuery(a.target))}),jQuery(a).closest(".rainmaker_form").addClass("rm_init_done"))},addLead:function(a,b,c){var b=b||void 0;if("undefined"!=typeof b){var c=c||void 0,d=b.closest(".rainmaker_form");d.find(".rm-loader").show();var e=b.find('input[name="_mc4wp_form_id"]')&&b.find('input[name="_mc4wp_form_id"]').length>0;if(d.hasClass("rm_custom")&&(b.attr("action")||e)||a.preventDefault(),b.find(".rm_required_field").val()||b.find(".ig_form_required_field").val())return d.find(".rm-loader").hide(),b.slideUp("slow"),void d.find("div.rm_form_message").show();var f={};if(jQuery.each(b.serializeArray()||{},function(a,b){f["rmfpx_"+b.name]=b.value}),f.rmfpx_added=!0,f.rmfpx_rm_nonce_field=rm_pre_data.rm_nonce_field,f["rmfpx_rm_form-id"]=d.data("form-id"),"undefined"!=typeof icegram){if(f.rmfpx_ig_mode=icegram.mode,f.rmfpx_ig_remote_url=window.location.href,"undefined"==typeof c){var g=(jQuery(b.closest("[id^=icegram_message_]")||{}).attr("id")||"").split("_").pop()||0;c=icegram.get_message_by_id(g)||{}}"undefined"!=typeof c.data&&(f.rmfpx_ig_message_id=c.data.id,f.rmfpx_ig_campaign_id=c.data.campaign_id)}action=rm_pre_data.ajax_url+"?action=rm_rainmaker_add_lead",jQuery.ajax({type:"POST",url:action,data:f,dataType:"json",success:function(a){a&&"undefined"!=typeof a.success?(b[0].reset(),b.trigger("success.rm",[b,a]),d.find(".rm-loader").hide(),""!==jQuery.trim(d.next("div.rm_form_message").html())&&(d.slideUp("slow"),d.next("div.rm_form_message").show()),"string"==typeof a.redirection_url&&""!=a.redirection_url&&(/^https?:\/\//i.test(a.redirection_url)||(a.redirection_url="http://"+a.redirection_url),setTimeout(function(){window.location.href=a.redirection_url},200))):d.find(".rm-loader").hide()},error:function(a){console.log(a)}})}}},"undefined"==typeof window.rainmaker&&(window.rainmaker=new a),jQuery(".rainmaker_form form").each(function(a,b){window.rainmaker.init(b)}),jQuery(window).on("init.icegram",function(a,b){"undefined"!=typeof b&&"undefined"!=typeof b.messages&&jQuery.each(b.messages,function(a,b){var c=jQuery(b.el).find(".rainmaker_form form");c.each(function(a,b){jQuery(b).hasClass("rm_init_done")||(window.rainmaker.init(b),jQuery(b).addClass("rm_init_done"))})})}),jQuery(window).off("success.rm"),jQuery(window).on("success.rm",function(a,b,c){if("undefined"!=typeof icegram){var d=(jQuery(a.target.closest("[id^=icegram_message_]")||{}).attr("id")||"").split("_").pop()||0,e=icegram.get_message_by_id(d)||void 0;if("undefined"!=typeof e)if("form_via_ajax"===e.data.cta&&e.el.find(".rm_subscription").length>0)e.el.trigger("form_success.ig_cta",[e]);else if("form"===e.data.cta||!e.data.cta){void 0==e.data.use_form&&(e.data.response_text=""),response_text='<div class="ig_form_response_text">'+(e.data.response_text||e.el.find(".rm_form_message").html()||"")+"</div>",e.el.find(".ig_form_container, .ig_message, .ig_headline").hide();var f=e.el.filter(".ig_container");-1!==jQuery.inArray(e.data.type,["interstitial","messenger"])?(f=e.el.find(".ig_message"),f.show(),e.el.find(".ig_headline").text("").show()):"tab"===e.data.type&&(f=e.el.find(".ig_data"),e.el.find(".ig_headline").show());try{f.append(response_text)}catch(g){console.log(g)}}}}),jQuery(window).off("form_submit.ig_cta"),jQuery(window).on("form_submit.ig_cta",window.rainmaker.addLead)});