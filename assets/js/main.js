(() => {

  const configAdsenseFixed = () => {
    const $adsFixed = $('.app__ads-fixed');
    const top = $adsFixed.offset().top;

    const handleWindowScrollFixAds = function () {
      const y = $(window).scrollTop();
      if (y >= top) {
        $adsFixed.addClass('ads__fixed-left');
      } else {
        $adsFixed.removeClass('ads__fixed-left');
      }
    };

    const fixAds = () => {
      if ($(window).width() >= 1200) {
        $(window).scroll(handleWindowScrollFixAds);
      } else {
        $(window).off('scroll', handleWindowScrollFixAds);
      }
    };

    fixAds();
    $(window).resize(() => fixAds());

    $('.ads__btn-close').click(() => $adsFixed.hide(200));
  };

  configAdsenseFixed();

})();
