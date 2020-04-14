var am2 = window.am2 || {};

(function ($) {
	'use strict';

    var viewportWidth = $(window).width(),
    	viewportHeight = $(window).height();

    am2.calculations = {

        init: function () {
            var self = this;
            ($('.repeater').length ? self.repeaterPlugin():'');

            self.staffCalculationRow();
            // self.staffCalculationTotal();

			// second tab - calculate tickets
			self.calculateTickets();

			// third tab - calculate after hours
			self.calculateAfterHours();

            // test
            // console.log(self.onlyNum('100'));

        },
        // strip non-numeric characters from string
        onlyNum: function($num) {
            return $num.replace(/[^0-9]/g, '');
        },
        calculateAfterHours: function () {
            var result = $('[data-after-hours-t-income]');

            function calculateA() {
                var dha1 = (is.not.nan($('[data-after-hours-a-1]').val() && is.not.number($('[data-after-hours-a-1]').val()) && !is.empty($('[data-after-hours-a-1]').val())) ? parseInt($('[data-after-hours-a-1]').val()):0),
                    dha2 = (is.not.nan($('[data-after-hours-a-2]').val() && is.not.number($('[data-after-hours-a-2]').val()) && !is.empty($('[data-after-hours-a-2]').val())) ? parseInt($('[data-after-hours-a-2]').val()):0),
                    dha3 = (is.not.nan($('[data-after-hours-a-3]').val() && is.not.number($('[data-after-hours-a-3]').val()) && !is.empty($('[data-after-hours-a-3]').val())) ? parseInt($('[data-after-hours-a-3]').val()):0),
                    dha4 = (is.not.nan($('[data-after-hours-a-4]').val() && is.not.number($('[data-after-hours-a-4]').val()) && !is.empty($('[data-after-hours-a-4]').val())) ? parseInt($('[data-after-hours-a-4]').val()):0),
                    dha5 = (is.not.nan($('[data-after-hours-a-5]').val() && is.not.number($('[data-after-hours-a-5]').val()) && !is.empty($('[data-after-hours-a-5]').val())) ? parseInt($('[data-after-hours-a-5]').val()):0);

                return ( (dha1*dha2) + (dha3*dha4) + dha5);
            }

            function calculateB() {
                var dhb1 = (is.not.nan($('[data-after-hours-b-1]').val() && is.not.number($('[data-after-hours-b-1]').val()) && !is.empty($('[data-after-hours-b-1]').val())) ? parseInt($('[data-after-hours-b-1]').val()):0),
                    dhb2 = (is.not.nan($('[data-after-hours-b-2]').val() && is.not.number($('[data-after-hours-b-2]').val()) && !is.empty($('[data-after-hours-b-2]').val())) ? parseInt($('[data-after-hours-b-2]').val()):0),
                    dhb3 = (is.not.nan($('[data-after-hours-b-3]').val() && is.not.number($('[data-after-hours-b-3]').val()) && !is.empty($('[data-after-hours-a-3]').val())) ? parseInt($('[data-after-hours-a-3]').val()):0),
                    dhb4 = (is.not.nan($('[data-after-hours-b-4]').val() && is.not.number($('[data-after-hours-b-4]').val()) && !is.empty($('[data-after-hours-a-4]').val())) ? parseInt($('[data-after-hours-a-4]').val()):0),
                    dhb5 = (is.not.nan($('[data-after-hours-b-5]').val() && is.not.number($('[data-after-hours-b-5]').val()) && !is.empty($('[data-after-hours-b-5]').val())) ? parseInt($('[data-after-hours-b-5]').val()):0);

                return ( (dhb1*dhb2) + (dhb3*dhb4) + dhb5);
            }

            function calculateC() {
                var dhc1 = (is.not.nan($('[data-after-hours-c-1]').val() && is.not.number($('[data-after-hours-c-1]').val()) && !is.empty($('[data-after-hours-c-1]').val())) ? parseInt($('[data-after-hours-c-1]').val()):0),
                    dhc2 = (is.not.nan($('[data-after-hours-c-2]').val() && is.not.number($('[data-after-hours-c-2]').val()) && !is.empty($('[data-after-hours-c-2]').val())) ? parseInt($('[data-after-hours-c-2]').val()):0),
                    dhc3 = (is.not.nan($('[data-after-hours-c-3]').val() && is.not.number($('[data-after-hours-c-3]').val()) && !is.empty($('[data-after-hours-c-3]').val())) ? parseInt($('[data-after-hours-c-3]').val()):0),
                    dhc4 = (is.not.nan($('[data-after-hours-c-4]').val() && is.not.number($('[data-after-hours-c-4]').val()) && !is.empty($('[data-after-hours-c-4]').val())) ? parseInt($('[data-after-hours-c-4]').val()):0),
                    dhc5 = (is.not.nan($('[data-after-hours-c-5]').val() && is.not.number($('[data-after-hours-c-5]').val()) && !is.empty($('[data-after-hours-c-5]').val())) ? parseInt($('[data-after-hours-c-5]').val()):0);

                return ( dhc1 + dhc2 + dhc3 + dhc4 + dhc5);
            }

            // CALCULATE A, CALCULATE B
            $( '[data-after-hours-a-1], [data-after-hours-a-2], [data-after-hours-a-3], [data-after-hours-a-4], [data-after-hours-a-5], [data-after-hours-b-1], [data-after-hours-b-2], [data-after-hours-b-3], [data-after-hours-b-4], [data-after-hours-b-5]' ).keyup(function( event ) {

                // console.log(calculateA());
                // console.log(calculateB());

                var calculateresult = (is.not.nan(calculateA()) ? calculateA():0) + (is.not.nan(calculateB()) ? calculateB():0);

                result.val(calculateresult);

                //calculate TAKE
                if(is.number(calculateresult)) {
                    $('[data-total-income]').val(calculateresult);

                    var dti = (is.not.nan($('[data-total-income]').val() && is.not.number($('[data-total-income]').val()) && !is.empty($('[data-total-income]').val())) ? parseInt($('[data-total-income]').val()):0);
                    var dte = (is.not.nan($('[data-total-expense]').val() && is.not.number($('[data-total-expense]').val()) && !is.empty($('[data-total-expense]').val())) ? parseInt($('[data-total-expense]').val()):0);
                    
                    var calculatetake = (is.not.nan(dti + dte) ? (dti + dte):0);
                    $('[data-take]').val(calculatetake);
                }
            });

            // CALCULATE C
            $( '[data-after-hours-c-1], [data-after-hours-c-2], [data-after-hours-c-3], [data-after-hours-c-4], [data-after-hours-c-5]' ).keyup(function( event ) {

                console.log(calculateC());

                var calculateresult = (is.not.nan(calculateC()) ? calculateC():0);

                $('[data-after-hours-t-expense]').val(calculateresult);

                //calculate TAKE
                if(is.number(calculateresult)) {
                    $('[data-total-expense]').val(calculateresult);

                    var dti = (is.not.nan($('[data-total-income]').val() && is.not.number($('[data-total-income]').val()) && !is.empty($('[data-total-income]').val())) ? parseInt($('[data-total-income]').val()):0);
                    var dte = (is.not.nan($('[data-total-expense]').val() && is.not.number($('[data-total-expense]').val()) && !is.empty($('[data-total-expense]').val())) ? parseInt($('[data-total-expense]').val()):0);


                    var calculatetake = (is.not.nan(dti + dte) ? (dti + dte):0);
                    $('[data-take]').val(calculatetake);
                }
            });
        },
		calculateTickets: function () {
            
            var ticketsTotal = 0;
            
			$( '[data-male], [data-female]' ).keyup(function( event ) {
				// console.log($(this).val());
                ticketsTotal = parseInt(ticketsTotal) + parseInt($(this).val());
                $('[data-tickets-total]').val(ticketsTotal);
			});
		},
        // repeater jquery plugin
        repeaterPlugin: function () {

            $(document).on('click', '[data-repeater-create-fake]', function () {
                var $this = $(this);

                // $('select').select2('destroy');
                // $('select').select2('data', null);
                // $('select').select2("disable");
                // $('[data-js="select"]').select2('destroy');


                // setTimeout(function(){
                //     $('select').each(function() {
                //         $(this).select2("destroy");
                //         $(this).select2();
                //     });
                // }, 100);

                $this.parents('.repeater').find('[data-repeater-create]').click();

            });

            $('.repeater').repeater({
                show: function () {

                    $(this).find('select').select2().removeClass('select2-hidden-accessible');
                    $(this).find('.select2-container').remove();

                    $(this).slideDown();

                    // recall funcions
                    am2.main.focusOnField();
                    am2.main.submitFieldButton();
                    am2.main.select2dropdown();
                    am2.main.datepicker();
                    am2.calculations.staffCalculationRow();
                    am2.calculations.staffCalculationTotal();

                },
                hide: function (deleteElement) {
                    var $this = $(this);

                    // sweet alert modal
                    /*swal({
                        title: "Are you sure?",
                        text: "You will not be able to recover this!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, delete it!",
                        closeOnConfirm: false
                    }, function () {
                        swal("Deleted!", "Your imaginary file has been deleted.", "success");

                        setTimeout(function () {
                        }, 1000);
                    });*/

					$this.slideUp(deleteElement);
					am2.calculations.staffCalculationTotal();

                    // default
                    /*if(confirm('Are you sure you want to delete this element?')) {
                        $(this).slideUp(deleteElement);
                    }*/

                    // default + custom calculation
                    /*if(confirm('Are you sure you want to delete this element?')) {
                        $(this).slideUp(deleteElement);

                        setTimeout(function () {
                            am2.calculations.staffCalculationTotal();
                        }, 1000);
                    }*/

                },
            });
        },
        // calculate staff total in a row on submit
        staffCalculationRow: function () {
            $('[data-staff-row]').find('[data-js="submit-field"]').click(function (ev) {
                ev.preventDefault();
                var $this = $(this);
                var $datastaffhours = $this.parents('[data-staff-row]').find('[data-staff-hours]').val();
                var $datastaffrate = $this.parents('[data-staff-row]').find('[data-staff-rate]').val();
                var $datastaffrtotal = $datastaffhours * $datastaffrate;

                $datastaffrtotal = (is.not.nan($datastaffrtotal) ? $datastaffrtotal:0);

                $this.parents('[data-staff-row]').find('[data-staff-total]').val($datastaffrtotal);

                am2.calculations.staffCalculationTotal();
            });

        },
        // calculate staff total - the sum of each row
        staffCalculationTotal: function () {
            var $datastafffinaltotal = 0;

            $('[data-staff-row]').each(function() {
                var $this = $(this);
                $datastafffinaltotal += (is.not.nan($this.find('[data-staff-total]').val() && is.not.number($this.find('[data-staff-total]').val())) ? parseInt($this.find('[data-staff-total]').val()):0);
            });

            $('[data-staff-final-total]').val($datastafffinaltotal);
        }

    };

    return am2.calculations.init();

}($));