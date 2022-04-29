export default function () {
  $('.js-tab').click(function () {
    var $this = $(this),
      thisIndex = $(this).index(),
      thisTabcon = $(this).parent('.ch-tab').siblings('.tab-content').find('.item-content').eq(thisIndex);
    $this.addClass('selected').siblings().removeClass('selected');
    thisTabcon.addClass('active').siblings().removeClass('active');
  })
  $('.tab-container').each(function () {
    $(this).find('.js-tab').eq(0).click();
  });

  $('a').attr("href", "#")
    .attr('target', '');

}