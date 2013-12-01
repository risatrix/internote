//Jquery plugin based on dbushell's excelent demo:
//https://github.com/dbushell/Responsive-Off-Canvas-Menu

;(function ($, window, document, undefined) {   
    var pluginName = 'footnote';

    // normalize vendor prefixes
    var transition_prop = window.Modernizr.prefixed('transition'),
        transition_end = (function() {
          var props = {
              'WebkitTransition' : 'webkitTransitionEnd',
              'MozTransition'    : 'transitionend',
              'OTransition'      : 'oTransitionEnd otransitionend',
              'msTransition'     : 'MSTransitionEnd',
              'transition'       : 'transitionend'
          };
          return props.hasOwnProperty(transition_prop) ? props[transition_prop] : false;
      })();

    
    var defaults = {
           toggle: ".fn"
        };

    function Notarize(element, options) {   
        this.element = element;
        this.$el = $(element);
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.is_note_open = false; 
        this.init();
    }

    var $doc = $(document.documentElement);

    Notarize.prototype = {
        init: function () {
            this.buildNotes();
            this.addToggle(this.settings.toggle);
            this.autoToggle();
            this.citeToggle();
            $doc.addClass('notes-ready');

          },
        buildNotes: function (target_menu) {
            var notes = $(document).find('.note p').clone();
            var arr = jQuery.makeArray(notes);
            $('.fn').each (function(index){
              var graf = $(this).parents('p');
              $(this).attr('data-index', index);
              var note = $(notes[index]).addClass('internote');
              $(note).appendTo(graf);
            });
        },
        addToggle: function (toggle) {
            var self = this;
            $(toggle).on('click tap', function (e) {
                e.preventDefault();
                self.toggleNotes(e);
            });  
        },
        toggleNotes: function (e) {
          index = $(e.target).attr('data-index');
            if ( this.is_note_open == true && index == this.curr_index) {
              this.closeNotes(e);
              $(e.target).removeClass('active-note');
            } else {
              this.openNotes(index);
              $(e.target).addClass('active-note');
            }
            //since the other notes could be attached to any element
            //this selector is as broad as possible
            $('.fn').not(e.target).removeClass('active-note');
        },
        openNotes: function (index) {
            $('.internote').removeClass('active visible');
            $('.internote:eq('+ index + ')').addClass('active visible');
            this.curr_index = index;
            this.is_note_open = true;
            $doc.addClass('note-on');
            return false;
        },
        closeNotes: function (e) {
            var thisNote = $('.internote.visible');
            var duration = (transition_end && transition_prop) ? 
                parseFloat(window.getComputedStyle(thisNote[0], '')[transition_prop + 'Duration']) : 0;
            $('.internote').removeClass('active');
            if (duration > 0) {
                setTimeout(function() {
                    $('.internote').removeClass('visible');
                    }, duration*1000);
            } else {
                 $('.internote').removeClass('visible');  
            }    
            this.is_note_open = false;
        },
        autoToggle: function() {
            $('#auto-toggle').on('click.' + pluginName, function (e) {
                this.note_is_open = !this.note_is_open;
                e.preventDefault();
                $doc.toggleClass('autonote-on');
                $('#auto-toggle').text(
                    this.note_is_open ? 'Turn AutoOpen Off' : 'Auto Open Notes'
                );
            });
        },
        citeToggle: function() {
            $('#citation-toggle').on('click.' + pluginName, function (e) {
                e.preventDefault();
                $doc.toggleClass('notes-hidden');
                $('.fn, .internote').toggleClass('visuallyhidden');
                $('#citation-toggle').text(
                    $doc.hasClass('notes-hidden') ? 'Show Notes' : 'Hide Notes'
                );
            });
        }    
    };

    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Notarize( this, options ));
            }
        });
    };

})( jQuery, window, document );