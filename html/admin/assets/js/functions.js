var am2 = window.am2 || {};

(function ($) {
	'use strict';

    // repeater vars
    var lastRadioCount = 0,
        lastCheckCount = 0,
        firstRadio = true,
        firstCheck = true,
        radioCount,
        checkCount;

    // Simulate click
	$.fn.simulateClick = function() {
	    return this.each(function() {
	        if('createEvent' in document) {
	            var doc = this.ownerDocument,
	                evt = doc.createEvent('MouseEvents');
	            evt.initMouseEvent('click', true, true, doc.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
	            this.dispatchEvent(evt);
	        } else {
	            this.click(); // IE Boss!
	        }
	    });
	}

	am2.main = {

		init: function () {
			var self = this;
			self.togglers();
			self.toggleSearch();
			//self.accordion();
			//self.tabsPlugin();
			self.submitFieldButton();
			self.focusOnField();
			self.select2dropdown();
			self.datepicker();
			self.responsiveTables();
			self.ajaxForm();
			self.fancyBox();
			self.notify();
			self.modals();
			self.cards();
			self.js_tabs();
			self.tooltip();
			self.divrepeater();
			self.showhidecards();
			self.sweetAlert();
            self.inputMask();
		},

		showhidecards: function() {

			var win = $(window);
			if (win.width() <= 480) {
				$('.js-card--hide__mobile').addClass('card--hide'); 
			}

			$(window).on('resize', function(){
			      var win = $(this); //this = window
			      if (win.width() <= 480) { console.log('hide');
			      	    $('.card--hide__mobile').addClass('card--hide').closest('.card-wrapper').find('.card-inner').hide();  
			      }
			      if (win.width() > 480) { console.log('show');
			      	    $('.card--hide__mobile').removeClass('card--hide').closest('.card-wrapper').find('.card-inner').show(); 
			      }
			});
			
			$('.js-card--show-hide').on('click', function(){           
                $(this).closest('.card-wrapper').toggleClass('card--hide').find('.card-inner').slideToggle();
            });
		},

        fixFormElements: function (obj) {

            // increment radio id if exists
            if($(obj).find('input[type="radio"]').length) {
                var i = 0;
                if(firstRadio == true) {
                    radioCount = $("input[type='radio']").length;
                } else {
                    radioCount = lastRadioCount;
                }
                $(obj).find('input[type="radio"]').each(function () {
                    var newCheckbox = $(this).attr("id", "radio" + (parseInt(radioCount) + parseInt(i)));
                    var newLabel = newCheckbox.next().attr("for", "radio" + (parseInt(radioCount) + parseInt(i)));
                    i++;
                });
                lastRadioCount = parseInt(radioCount) + parseInt(i);
                firstRadio = false;
            }

            // increment default checkbox id if exists
            if($(obj).find('input[type="checkbox"]').length) {
                var i = 0;
                if(firstCheck == true) {
                    checkCount = $("input[type='checkbox']").length;
                } else {
                    checkCount = lastCheckCount;
                }
                $(obj).find('input[type="checkbox"]').each(function () {
                    var newCheckbox = $(this).attr("id", "checkbox" + (parseInt(checkCount) + parseInt(i)));
                    var newLabel = newCheckbox.next().attr("for", "checkbox" + (parseInt(checkCount) + parseInt(i)));
                    i++;
                });
                lastCheckCount = parseInt(checkCount) + parseInt(i);
                firstCheck = false;
            }

        },

        divrepeater: function () {

            $(document).on('click', '[data-repeater-create-fake]', function (e) {
                e.preventDefault();
                var $this = $(this);
                $this.parents('.divrepeater').find('[data-repeater-create]').click();
            });

            $('.divrepeater').repeater({
                // (Optional)
                // "defaultValues" sets the values of added items.  The keys of
                // defaultValues refer to the value of the input's name attribute.
                // If a default value is not specified for an input, then it will
                // have its value cleared.
                defaultValues: {
                },
                // (Optional)
                // "show" is called just after an item is added.  The item is hidden
                // at this point.  If a show callback is not given the item will
                // have $(this).show() called on it.
                show: function () {

                    am2.main.fixFormElements(this);

                    // SELECT2 FIX
                    $(this).find('select').select2().removeClass('select2-hidden-accessible');
                    $(this).find('.select2-container').remove();
                    // Custom checkbox fix
                    var randId = 'elem_' + Math.random().toString(36).substring(7);
                    $(this).find('[data-repeat-randomize]').each(function(){
                        var elemAttr = $(this).attr('data-repeat-randomize');
                        $(this).attr( elemAttr, randId);
                    });

                    $(this).slideDown();

                    // RECALL FUNCTIONS
                    am2.main.focusOnField();
                    am2.main.submitFieldButton();
                    am2.main.select2dropdown();
                    am2.main.datepicker();
                    am2.main.inputMask();
                },
                // (Optional)
                // "hide" is called when a user clicks on a data-repeater-delete
                // element.  The item is still visible.  "hide" is passed a function
                // as its first argument which will properly remove the item.
                // "hide" allows for a confirmation step, to send a delete request
                // to the server, etc.  If a hide callback is not given the item
                // will be deleted.
                hide: function (deleteElement) {
                    // if(confirm('Are you sure you want to delete this element?')) {
                    // }
                    $(this).slideUp(deleteElement);
                },
                // (Optional)
                // Removes the delete button from the first list item,
                // defaults to false.
                isFirstItemUndeletable: true
            })
		},

		togglers: function () {

			// toggle body class for sidebar state
            var sidebarClass = '.js-sidebar-toggle';
            var sidebarTogglerClass = 'sidebar-toggled';
            var sidebarCookieName = 'gr-admin-sidebar-state';
            // check cookie for sidebar menu and toggle body class
            var sidebarIsToggledCookie = ( parseInt( readCookie(sidebarCookieName) ) === 1  ) ? true : false;
            //$('body').toggleClass(sidebarTogglerClass, sidebarIsToggledCookie );
            // toggle menu and set cookie on toggle
			$(sidebarClass).click(function () {
				$('body').toggleClass(sidebarTogglerClass);
                var sidebarIsToggled = ( $('body').hasClass(sidebarTogglerClass) ) ? 1 : 0;
                //createCookie(sidebarCookieName, sidebarIsToggled );
			});

            function createCookie(name,value,days) {
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime()+(days*24*60*60*1000));
                    var expires = "; expires="+date.toGMTString();
                }
                else var expires = "";
                document.cookie = name+"="+value+expires+"; path=/";
            }

            function readCookie(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for(var i=0;i < ca.length;i++) {
                    var c = ca[i];
                    while (c.charAt(0)==' ') c = c.substring(1,c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
                }
                return null;
            }

			// toggle sidebar submenus
			$('.has_submenu > a').on('click', function (e) {
				e.preventDefault();
				$('.has_submenu').not($(this).parent()).removeClass('active');
				$(this).parent().toggleClass('active');

			});

            // on resize hide sidebar menu
            /*
            $( window ).resize( function() {
                if( 993 >= $(window).width() ) {
                    $('body').addClass( 'sidebar-toggled' );
                } else {
                    $('body').removeClass( 'sidebar-toggled' );
                }
            });

            $(window).load( function() {
                if( 993 >= $(window).width() ) {
                    $('body').addClass( 'sidebar-toggled' );
                }
            });
            */
		},

		toggleSearch: function() {

        	$( '.js-search-toggle' ).click( function( e ) {
				e.preventDefault();
				if( $( '.search-top.toggled' ).length > 0) {
					$( '.search-top' ).slideUp( 300, function() {
						$( this ).css( "display", "" ).removeClass( 'toggled' );
					});
				} else {
					$( '.search-top' ).slideDown( 'slow', function() {
						$( this ).css( "display", "table" ).addClass( 'toggled' );
					});
				}
			});


			$('.product').click(function() {
		    if($('.toggled').length > 0){
		      $('.info').slideToggle('slow', function() {
		        $('.product').css( "border-top","none" ).removeClass('toggled');
		      });
		    }else{
		      $('.info').slideToggle('slow', function() {
		        $('.product').css( "border-top","1px solid #000" ).addClass('toggled');
		      });
		    }
});


        },

		accordion: function () {
			var animTime = 300;
			$('.am2-accordion .am2-accordion__panel').bind('click', function () {
				if ($(this).hasClass('current')) {
					$(this).removeClass('current').find('.panel__content').slideUp(animTime);
				} else {
					var currentAccordionPanel = $('.am2-accordion .am2-accordion__panel.current');
					if (currentAccordionPanel.length > 0) {
						currentAccordionPanel.removeClass('current').find('.panel__content').slideUp(animTime);
					}
					$(this).addClass('current').find('.panel__content').slideDown(animTime);
				}
			});
		},

		tabsPlugin: function () {
			$('ul.am2-tabs__titles').tabs(
				'.tabs__panel',
				{
					effect: 'fade',
					onClick: function (event, tabIndex) {
						var tab = $('.tabs__panel').eq(tabIndex);
						var tabId = tab.attr('id');
						$('.tabs__panel').removeClass('tabs__panel--current');
						tab.addClass('tabs__panel--current');
						$('#' + tabId + ' .js-slick-slider').addClass('slider--reload').slick('setPosition').removeClass('slider--reload');
					}
				}
			);
		},

		submitFieldButton: function () {

			$('[data-js="submit-field"]').click(function (ev) {

				ev.preventDefault();

				var $this = $(this);
				var $parent = $this.parents('fieldset');

				$parent.removeClass('is-focused');

			});

		},

		focusOnField: function () {

			$('[data-js="focus-on-field"]').click(function (ev) {

				ev.preventDefault();

				var $this = $(this);
				var $parent = $this.parents('fieldset');

				$parent.addClass('is-focused').find('input').focus();

			});

		},

		
		select2dropdown: function () {
	
			function select2(element){
				element.select2({
					width: '100%',
					minimumResultsForSearch: -1,
					dropdownParent: element.parent(),
                    allowClear: ( element.attr('disable-clear')) ? false : true,
                    placeholder: "Select..."
				}).on('change', function(e) {
				   if(element.hasClass('autosubmit-select')) {
					   element.closest('form').submit();
				   }
				});
			}

			function select2WithAjax(element){
				var selectSourceUrl = element.data('source-url');
				var minimumInputLength = element.data('min-input-length');
				element.select2({
					width: '100%',
					dropdownParent: element.parent(),
					minimumInputLength: minimumInputLength || 0,
                    allowClear: ( element.attr('disable-clear')) ? false : true,
                    placeholder: "Select...",
					ajax: {
						accepts: {
							select: 'application/select+json' 
						},
						converters: {
							'json select': function(result) {
								return result;
							}
						},
						url: selectSourceUrl,
						dataType: 'select',
						delay: 250,
						data: function (params) {
							var custom = {};
							if(element.attr('data-select-depends') != null){
								var selectDependsParams = JSON.parse(element.attr('data-select-depends'));
								$.each(selectDependsParams, function(key, value){
									custom[key] = $(':input[name="' + value + '"]').val();
								});
							}
                            if( element.attr('data-reset-field') != null && $(element.attr('data-reset-field')).length > 0 ){
                                $( element.attr('data-reset-field') ).select2('val','');
                                $( element.attr('data-reset-field') ).val('');
                            }
							return $.extend({}, custom, {
								q: params.term, // search term
								page: params.page
							});
						},
						processResults: function (data, params) {
						  return {results: data.items};
						},
						error: function(response, error) {
						  console.log(response);  
						  console.log(error);
						},
						cache: false
					}
				}).on('select2:select', function(e) {
				  var url = e.params.data.url;
				  if(url) {
					window.location = url;
				  }
				}).on('change', function(e) {
				   if(element.hasClass('autosubmit-select')) {
					   element.closest('form').submit();
				   }
				});
			}
			
			/* Select2 normal */
			$( '[data-js="select"]' ).each( function() {
				select2($( this ));
			});
			
			/* Select2 with ajax */
			$('[data-js="select-with-ajax"]').each( function(i,e){
				select2WithAjax($( this ));
			});
			
			$( ':input[data-select-depends]' ).each( function() {
				var element = $(this);
                var form    = element.closest('form');
				
				var selectSourceUrl = element.data('source-url');
				var selectDependsParams = JSON.parse(element.attr('data-select-depends'));
				var selectType = element.is("[data-js=select-with-ajax]") ? 'select-with-ajax' : 'select';
				
				$.each(selectDependsParams, function(key, value){
					var dependsInput = form.find(':input[name="' + value + '"]');
                    
					if(dependsInput.val() == ''){
						element.children('option').remove();
						element.val('').trigger('change');
						element.prop('disabled', true);
					}
        
					dependsInput.change(function(){
						if(selectType == 'select'){
							element.prop('disabled', true);
                            
							if(dependsInput.val() == 0){
								element.children('option').remove();
								element.val('').trigger('change');
								element.prop('disabled', true);
								return;
							}
                
							var data = {};
							$.each(selectDependsParams, function(key, value){
								data[key] = form.find(':input[name="' + value + '"]').val();
							});
							
							$.ajax({
								url : selectSourceUrl,
								dataType: 'select',
								data : data,
								converters: {
									'json select': function(result) {
										return result;
									} 
								},
								accepts : {
									select: 'application/select+json' 
								},
								success : function(html){
									element.children('option').remove();
									element.siblings('span').remove();
									$.each(html.items, function(key, value) {   
										element.append($("<option></option>").attr("value", value.id).text(value.text)); 
									});
									element.prop('disabled', false);
									select2(element);
								},
								error: function(response, error) {
									console.log(response);  
									console.log(error);
								},
							});
						}else{
							element.children('option').remove();
							element.siblings('span').remove();
							select2WithAjax(element);
							element.change();
						}
					});
				});
			});
		},


		inputMask: function() {

			$( '[data-js-mask]' ).each( function() {
				var $this = $( this ),
					opts = {};

				var type = $this.data( 'js-mask' );
				switch ( type ) { 
					case 'phone': 
						opts = "(999) 999-9999";
						break;
					case 'date': 
						opts = "9999-99-99";
						break;
					default:
						opts = "(999) 999-9999";
				}

				//configurable via data-input-mast attr
				var pluginOptions = $this.data( 'input-mask' );
				if ( pluginOptions )
					opts = pluginOptions;

				$this.mask( opts );
			});

		},

		responsiveTables: function () {

			$('.js-responsive-table').stacktable();

		},

		dropzone: function () {

			$('[data-js="dropzone"]').dropzone({url: "/file/post"});

		},

		tooltip: function() {
			$('.tooltip').tooltipster({
                touchDevices: false,
                position: 'top-left'
            });
		},

		datepicker: function () {

			// DATEPICKER DEFAULT
			$('[data-js="datepicker"]').pikaday({
				'format' : 'MM/DD/YYYY',
			});

			// DATEPICKER DEFAULT
			$('[data-js="datepicker-format"]').pikaday({
				position: 'top left',
				firstDay: 1,
				minDate: new Date('2016-03-06'),
				maxDate: new Date('2016-03-21'),
				format: "MM/DD/YYYY"
			});

			$('[data-js="clockpicker"]').clockpicker({
				donetext: 'Done'
			});

		},

		ajaxForm: function (pParent){

            // only ajax forms
            $('.js-ajax-form:not(.js-form-validation)').each(function(index,element){
                $(this).on('submit', function(e){
                    e.preventDefault();
                    am2.main.ajaxFormSubmit(this);
                    console.log('ajax');
                });
            });

            // only validation forms
            $('.js-form-validation:not(.js-ajax-form)').each(function(index,element) {
                $(this).on('submit', function(e){
                    e.preventDefault();
                    console.log('validate',this);
                    $(this).validate({
                        ignore: [],
                        submitHandler: function(form) {
                            $(form).submit();
                        }
                    });
                });
            });

            // both ajax and validation forms
            $('.js-form-validate.js-ajax-form').each(function(index,element) {
                $(this).on('submit', function(e){
                    e.preventDefault();
                    $(this).validate({
                        ignore: [],
                        submitHandler: function(form) {
                            am2.main.ajaxFormSubmit(form);
                            console.log('validate+ajax');
                        }
                    });
                });
            });
            
            //$.validator.setDefaults({debug: true});
            $.validator.addMethod("cRequired", $.validator.methods.required, "Customer name required");
            $.validator.addMethod("cMinlength", $.validator.methods.minlength,
                $.validator.format("Customer name must have at least {0} characters")
            );

            $.validator.addClassRules("required-notempty", { 
                cRequired: true 
            });

		},
        ajaxFormSubmit: function(pElement){
            // object
            pElement = $(pElement);
            // get form data
            var formAction = pElement.attr('action');
            var formMethod = pElement.attr('method');
            var formData = pElement.serialize();
            var formNotifyType = pElement.data('notify');
            var closeModal = pElement.data('close-modal');
            // make ajax request
            $.ajax({
                method: formMethod,
                url: formAction,
                data: formData,
                cache: false
            })
            .done(function (data) {
                sweetAlert('Success', 'Data was successfully saved.', 'info');
                return false;
            }).fail(function(data){
                var str = '';
                $.each( JSON.parse(data.responseText),function(key, value){
                    str += value + '<br>';
                });
                sweetAlert('Ooops...', str, 'error');
                return false;
            });
        },

        modals: function () {
            // reinit libs required by modal content
            $(document).on('opened', '.remodal', function () {
                // if forms dont have ajax event attach, attach it
                if ($(this).find('.js-ajax-form:not(".js-ajax-attached")').length > 0) {
                    //am2.main.ajaxForm('.remodal');
                }
                // if there is a validation form in modal, init validation
                if ($(this).find('.js-form-validate').length > 0) {
                    //console.log(123);
                    //am2.main.ajaxForm();
                    //am2.main.select2dropdown();
                }

            });
        },

		fancyBox: function() {

            // type default
			$('a[rel="fancybox"]').fancybox({

            });

            // type image
            $('a[rel="fancy-image"]').fancybox({
                type: 'image'
            });
		},

		notify: function (pType, pClass, pData) {
			// defaults
			var notifyType = pType || ''; // inline, modal, pnotify
			var notifyClass = pClass || '';
            var notifyInterval = 5000;
			// notifications
			if (notifyType == 'inline') {
				var str = '<div class="notify notify--' + notifyClass + '">' + pData + '<span class="close"></span></div>';
				$(str).appendTo('#js-notifications').delay(notifyInterval).slideUp(200);                
				am2.main.handleinlineNotifiers();
			}
			if (notifyType == 'modal') {
				if ($('[data-remodal-id="notify"]').length > 0) {
					$('[data-remodal-id="notify"]').attr('class', '').addClass('remodal remodal-is-initialized remodal-is-closed remodal--' + notifyClass);
					$('[data-remodal-id="notify"]').find('.notify-content').html(pData);
					$('[data-remodal-id="notify"]').remodal().open();
				}
				else {
					console.log('!!! Missing Modal Notification HTML element on page !!!');
				}
			}
			if (notifyType == 'pnotify') {
				new PNotify({
					title: notifyClass,
					text: pData,
					addclass: 'brighttheme-' + notifyClass,
					type: notifyClass,
					hide: true,
					history: {
						history: false
					}
				});
			}
			// used for existing inline notifiers
			am2.main.handleinlineNotifiers();
		},

		handleinlineNotifiers: function () {
			// detect changes on inline notify container
			$('#js-notifications').bind("DOMSubtreeModified", function () {
				//console.log('inline notifiers updated');
			});
			// remove individual on click
			$('.notify .close').on('click', function (e) {
				e.preventDefault();
				var $notifier = $(this).parent();
				$notifier.addClass('notify--removed');
				setTimeout(function () {
					$notifier.remove()
				}, 500);
			});
		},

		cards: function () {
			$('.card-toggler').on('click', function (e) {
				e.preventDefault();
				$(this).closest('.card-wrapper').toggleClass('hidden');
			});
		},

		js_tabs: function () {

			// check item count
            $('[data-js="count-tab-no"]').each(function() {
                var tabs_count = $(this).find('.js-tabs-cell').length;
                $(this).addClass('has-' + tabs_count + '-tabs');
            });

            // for mobile: select2
            var js_tab_select2 = $('[data-js="js-tab-select2"]');
            js_tab_select2.select2({
                width: '100%',
                minimumResultsForSearch: -1
            });
            js_tab_select2.on('change', function() {

                var titem = $( '[data-js="js-tab"][data-tab="' + $( this ).val() + '"]' );
                if( titem.length > 0 ) {
                    //titem.trigger( 'click' );
                    titem.simulateClick('click');
                } else {
                    window.location.href = $( this ).val();
                }

            });

            // item click function
            $('[data-js="js-tab"]').click(function (ev) {

                //ev.preventDefault();

                var $this = $(this);
                var $parent = $(this).parent();
                var $tab = $this.data('tab');

                if (!$parent.hasClass('is-disabled') && !$parent.hasClass('is-active')) {
                    $parent.parent().find('.js-tabs-cell').removeClass('is-active');
                    $('.js-tab').removeClass('is-active');
                    $parent.addClass('is-active');
                    $($tab).addClass('is-active');
                    js_tab_select2.val($tab).trigger('change');
                }

                setTimeout(function() {
                    window.scrollTo(0, 0);     // run it a bit later also for browser compatibility
                }, 1);

            });

            // prev button
            $('[data-js="js-tab-next"]').click(function (ev) {
                ev.preventDefault();
                $('.js-tabs-cell.is-active').nextAll('.js-tabs-cell:not(".is-disabled"):first').find('.js-tab-link').trigger('click');
            });

            // next button
            $('[data-js="js-tab-prev"]').click(function (ev) {
                ev.preventDefault();
                $('.js-tabs-cell.is-active').prevAll('.js-tabs-cell:not(".is-disabled"):first').find('.js-tab-link').trigger('click');
            });

            // use hash anchor for tabs
            var hash = $.trim( window.location.hash );
            if ( hash ) {
                if ( hash ) $( '.js-tab-link[data-tab="'+hash+'"]' ).trigger( 'click' );
                window.scrollTo(0, 0);         // execute it straight away
                setTimeout(function() {
                    window.scrollTo(0, 0);     // run it a bit later also for browser compatibility
                }, 1);
            }

		},

		sweetAlert: function() {
			
			$( 'body' ).on( 'click', '.js-confirm', function( event ) {
				event.preventDefault();
				var me = $( this );
				// defaults
				var defaults = {   
					title: "Are you sure?",   
					text: "You will not be able to revert this action!",   
					type: "warning",   
					showCancelButton: true,   
					confirmButtonColor: "#a94442",   
					confirmButtonText: "Yes!",   
					closeOnConfirm: true 
				};
				// data attribute params
				var params = me.data( 'alert' );
				// merge objects
				$.extend( defaults, params );
                // checkfor update field
                var updateField = me.data( 'alert-update' );
				// show popup
				swal(defaults).then(function(inputValue) {
                    console.log(inputValue);
                    if( updateField !== 'undefined' ){
                        me.closest('form').find(updateField).val( inputValue );
                    }
                    if ( inputValue !== 'undefined' && inputValue != "" ) {
                        me.closest( 'form' ).submit();
                    }
                });

			});

		}

	};
    return am2.main.init();

}($));