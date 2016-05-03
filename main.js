var Color = require('color');
var $ = require('jquery');

var makeBlock = function(color, totalCount) {
  width = (1 / totalCount) * 100;
  return ('<div class="ramp-block" style="background-color: ' + color.hexString() + '; width: ' + width + '%;"></div>');
}

$(function() {
  $("#generate-ramp-form").submit(function() {
    var numberOfSteps = $("#number-of-colors").val();
    var totalColorsCount = numberOfSteps*2 + 1;
    var saturationShiftPerStep = $("#saturation-shift-per-step").val() / 100;
    var lightValue = $("#light-value").val();
    var lightSaturation = $("#light-saturation").val();
    var darkValue = $("#dark-value").val();
    var darkSaturation = $("#dark-saturation").val();
    var hueShiftPerStep = $("#hue-shift-per-step").val();
    var middleColor = Color($("#middle-color-value").val());
    var updatedContent = [];

    var lightColor = middleColor.clone().rotate(hueShiftPerStep * numberOfSteps * -1).lightness(lightValue).saturation(lightSaturation);
    var darkColor  = middleColor.clone().rotate(hueShiftPerStep * numberOfSteps).lightness(darkValue).saturation(darkSaturation);
    // updatedContent.push(makeBlock(lightColor, totalColorsCount));
    // updatedContent.push(makeBlock(middleColor, totalColorsCount));
    // updatedContent.push(makeBlock(darkColor, totalColorsCount));

    console.log(lightColor.hexString());
    console.log(darkColor.hexString());
    for (var i = 0; i < numberOfSteps; i++) {
      var color = middleColor.clone().mix(lightColor.clone(), i * (1.0/numberOfSteps));
      var div = makeBlock(color, totalColorsCount);
      updatedContent.push(div);
    }
    updatedContent.push(makeBlock(middleColor, totalColorsCount));
    for (var i = 0; i < numberOfSteps; i++) {
      var color = middleColor.clone().mix(darkColor.clone(), (numberOfSteps - i - 1) * (1.0/numberOfSteps));
      var div = makeBlock(color, totalColorsCount);
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
