sap.ui.define([
], 
    function (JSONModel, Device) {
        "use strict";

    return {
            model: {
                routes: {
                    Fragments: {
                        Dialog: "ediliciofinal.utils.fragments.Dialog",
                        ControllerMain: "ediliciofinal.controller.Main",
                        ControllerDetail:"ediliciofinal.controller.Detail"
                    }
                }
            }
    };
});