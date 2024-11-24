let cur_menu = -1;
let cur_menu_item = -1;

$(function() {
  $(".menu").on({
    "mouseenter": function() {
      $(this).siblings().removeClass("active");
      $(this).addClass("active");
      cur_menu = $(this).index();
      cur_menu_item = -1;
    },
    "click": function() {
      if ($(this).hasClass("active")) {
        $("#menubar").toggleClass("active");
        $(this).children().removeClass("active");
      } else {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        cur_menu = $(this).index();
        cur_menu_item = -1;
      }
    }
  });

  $(".menu-item").on({
    "mouseenter": function() {
      $(".menu-item.active").removeClass("active");
      $(this).addClass("active");
      cur_menu_item = $(this).index();
    },
    "mouseleave": function() {
      $(this).removeClass("active");
      cur_menu_item = -1;
    }
  });

  $(".toggle-setting").on("click", function() {
    $(this).children().eq(0).each(function() {
        this.checked = !this.checked;
        setSetting(this.id, this.checked);
    });
  })

  $(document).on({
    "click": function(event) {
      if (!event.target.matches(".menu-btn")) {
        $("#menubar").removeClass("active");
        cur_menu = -1;
      }
    },
    "keydown": function(event) {
      if ($("#menubar").hasClass("active")) {
        let content = $(".menu-content").eq(cur_menu).children().filter("a");
        switch (event.key) {
          case 'Escape':
            $("#menubar").removeClass("active");
            cur_menu = -1;
            break;
          case ' ':
          case 'Enter':
            $(".active").click();
            $(".active").removeClass("active");
            break;
          case 'ArrowLeft':
            event.preventDefault();
            $(".menu").eq(cur_menu).removeClass("active");
            content.eq(cur_menu_item).removeClass("active");
            $(".menu").eq(cur_menu = (--cur_menu + 6) % 6).addClass("active");
            cur_menu_item = -1;
            // menus[cur_menu].classList.add("active");
            break;
          case 'ArrowRight':
            event.preventDefault();
            $(".menu").eq(cur_menu).removeClass("active");
            content.eq(cur_menu_item).removeClass("active");
            $(".menu").eq(cur_menu = ++cur_menu % 6).addClass("active");
            cur_menu_item = -1;
            break;
          case 'ArrowUp':
            event.preventDefault();
            if (cur_menu_item < 0) {
              cur_menu_item = content.length - 1;
              content.eq(cur_menu_item = content.length - 1).addClass("active");
            } else {
              content.eq(cur_menu_item).removeClass("active");
              content.eq(cur_menu_item = (--cur_menu_item + content.length) % content.length).addClass("active");
            }
            break;
          case 'ArrowDown':
            event.preventDefault();
            content.eq(cur_menu_item).removeClass("active");
            content.eq(cur_menu_item = ++cur_menu_item % content.length).addClass("active");
            break;
        }
      }
    },
  });
})