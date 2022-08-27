// Edited by wilkes@me.com for GURPS - April 11, 2021
//
// A macro for the Foundry virtual tabletop that lets a user configure their token's vision and lighting settings. This script is taken from Sky's foundry repo here: https://github.com/Sky-Captain-13/foundry/blob/master/scriptMacros/tokenVision.js.

let applyChanges = false;
new Dialog({
  title: `Token Vision Configuration`,
  content: `
    <form>
      <div class="form-group">
        <label>Vision Type:</label>
        <select id="vision-type" name="vision-type">
          <option value="nochange">No Change</option>
          <option value="self">Self</option>
          <option value="nightvision-1-2">Night Vision 1-2</option>
          <option value="nightvision-3-4">Night Vision 3-4</option>
          <option value="nightvision-5-6">Night Vision 5-6</option>
          <option value="nightvision-7-8">Night Vision 7-8</option>
          <option value="nightvision-9">Night Vision 9</option>
          <option value="darkvision">Dark Vision</option>
        </select>
      </div>
      <div class="form-group">
        <input type="checkbox" id="helmet-obscures" name="helmet-obscures">
        <label for="helmet-obscures">Wearing Great Helm</label>
      </div>
      <div class="form-group">
        <label>Light Source:</label>
        <select id="light-source" name="light-source">
          <option value="nochange">No Change</option>
          <option value="none">None</option>
          <option value="candle">Candle</option>
          <option value="lamp">Oil Lamp</option>
          <option value="torch">Torch</option>
          <option value="lantern">Lantern</option>
          <option value="bullseye">Lantern (Bullseye)</option>
          <option value="light">Spell: Light (Candle)</option>
          <option value="continual-light-2">Spell: Continual Light (Moonlight)</option>
          <option value="continual-light-4">Spell: Continual Light (Torch)</option>
          <option value="continual-light-6">Spell: Continual Light (Daylight)</option>
        </select>
      </div>
    </form>
    `,
  buttons: {
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Apply Changes`,
      callback: () => applyChanges = true
    },
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Cancel Changes`
    },
  },
  default: "yes",
  close: html => {
    if (applyChanges) {
      for ( let token of canvas.tokens.controlled ) {
        let visionType = html.find('[name="vision-type"]')[0].value || "none";
        let helmetObscures = html.find('[name="helmet-obscures"]')[0].checked || false;
        let lightSource = html.find('[name="light-source"]')[0].value || "none";
        let dimSight = 0;
        let brightSight = 0;
        let dimLight = 0;
        let brightLight = 0;
        let sightAngle = 270;
        let lightAngle = 360;
        let lockRotation = token.data.lockRotation;
        let lightAnimation = token.data.lightAnimation;
        let lightAlpha = token.data.lightAlpha;
        let lightColor = token.data.lightColor;
        const colorFire = "#f8c377";
        const colorWhite = "#ffffff";
        const colorMoonGlow = "#f4f1c9";
        // Get Vision Type Values
        switch (visionType) {
          case "self":
            dimSight = 0;
            brightSight = 0;
            break;
          case "nightvision-1-2":
            dimSight = 1;
            brightSight = 0;
            break;
          case "nightvision-3-4":
            dimSight = 2;
            brightSight = 0;
            break;
          case "nightvision-5-6":
            dimSight = 3;
            brightSight = 0;
            break;
          case "nightvision-7-8":
            dimSight = 4;
            brightSight = 0;
            break;
          case "nightvision-9":
            dimSight = 5;
            brightSight = 0;
            break;
          case "darkvision":
            dimSight = 0;
            brightSight = 6;
            break;
          case "nochange":
          default:
            dimSight = token.data.dimSight;
            brightSight = token.data.brightSight;
        }
        // Check for helmet obscuring
        if (helmetObscures) {
            sightAngle = 90;
        }
        // Get Light Source Values
        switch (lightSource) {
          case "none":
            dimLight = 0;
            brightLight = 0;
            lightAnimation = {type: "none"};
            lightAlpha = 0;
            break;
          case "candle":
            dimLight = 2;
            brightLight = 1;
            lightAnimation = {type: "torch", speed: 2, intensity: 2};
            lightColor = colorFire;
            lightAlpha = 0.15;
            break;
          case "lamp":
            dimLight = 9;
            brightLight = 3;
            lightAnimation = {type: "torch", speed: 2, intensity: 2};
            lightColor = colorFire;
            lightAlpha = 0.15;
            break;
          case "torch":
            dimLight = 8;
            brightLight = 4;
            lightAnimation = {type: "torch", speed: 2, intensity: 2};
            lightColor = colorFire;
            lightAlpha = 0.15;
            break;
          case "lantern":
            dimLight = 12;
            brightLight = 6;
            lightAnimation = {type: "torch", speed: 2, intensity: 2};
            lightColor = colorFire;
            lightAlpha = 0.15;
            break;
          case "bullseye":
            dimLight = 24;
            brightLight = 12;
            lockRotation = false;
            lightAngle = 60;
            lightAnimation = {type: "torch", speed: 2, intensity: 2};
            lightColor = colorFire;
            lightAlpha = 0.15;
            break;
          case "light":
            dimLight = 2;
            brightLight = 1;
            lightAnimation = {type: "none"};
            lightColor = colorMoonGlow;
            lightAlpha = 0.15;
            break;
          case "continual-light-2":
            dimLight = 6;
            brightLight = 3;
            lightAnimation = {type: "none"};
            lightColor = colorMoonGlow;
            lightAlpha = 0.15;
            break;
          case "continual-light-4":
            dimLight = 8;
            brightLight = 4;
            lightAnimation = {type: "none"};
            lightColor = colorFire;
            lightAlpha = 0.15;
            break;
          case "continual-light-6":
            dimLight = 16;
            brightLight = 8;
            lightAnimation = {type: "none"};
            lightColor = colorWhite;
            lightAlpha = 0.15;
            break;
          case "nochange":
          default:
            dimLight = token.data.dimLight;
            brightLight = token.data.brightLight;
            lightAngle = token.data.lightAngle;
            lockRotation = token.data.lockRotation;
            lightAnimation = token.data.lightAnimation;
            lightAlpha = token.data.lightAlpha;
            lightColor = token.data.lightColor;
        }
        // Update Token
        token.update({
          vision: true,
          dimSight: dimSight,
          brightSight: brightSight,
		  sightAngle: sightAngle,
          dimLight: dimLight,
          brightLight:  brightLight,
          lightAngle: lightAngle,
          lockRotation: lockRotation,
          lightAnimation: lightAnimation,
          lightAlpha: lightAlpha,
          lightColor: lightColor
        });
      }
    }
  }
}).render(true);