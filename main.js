var Color = require('color');
var $ = require('jquery');

var makeBlock = function(color, totalCount) {
  width = (1 / totalCount) * 100;
  return ('<div class="ramp-block" style="background-color: ' + color.hexString() + '; width: ' + width + '%;"></div>');
}

$(function() {
  $("#generate-ramp-form").submit(function() {
    var numberOfColors = $("#number-of-colors").val();
    var saturationShiftPerStep = $("#saturation-shift-per-step").val() / 100;
    var valueShiftPerStep = $("#value-shift-per-step").val() / 100;
    var hueShiftPerStep = $("#hue-shift-per-step").val();
    var middleColor = $("#middle-color-value").val();
    var updatedContent = [];

    for (var i = -1*numberOfColors; i <= numberOfColors; i++) {
      var color = Color(middleColor).
        rotate(hueShiftPerStep * i).
        darken(valueShiftPerStep * i).saturate(saturationShiftPerStep * i);
      var div = makeBlock(color, numberOfColors*2 + 1);
      updatedContent.push(div);
    }
    $("#ramp-results").prepend('<div class="ramp-group">' + updatedContent.join("\n") + '<a class="remove" href="#">Remove</a></div>');
    return false;
  });

  $(document).on("click", ".ramp-group a.remove", function() {
    $(this).closest(".ramp-group").remove()
    return false;
  });
});
