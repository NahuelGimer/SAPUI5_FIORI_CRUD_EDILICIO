sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("Constants.model.routes.Fragments.ControllerMain", {
            onInit: function () {
            },

            searchMain: function(evt){
                var filters = [];
                var query = evt.getParameter("query");
                if (query && query.length > 0){
                    filters.push (new Filter ({
                    path:"IDORDENTRABAJO",
                    operator: FilterOperator.EQ,
                    value1: query
                    }));
                }
                var list = this.getView().byId("list");
                var binding = list.getBinding("items");
                binding.filter(filters);
             debugger },

            navigationMain: function(oEvent){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var selectedID = oEvent.getSource().getBindingContext().getProperty("IDORDENTRABAJO");
                oRouter.navTo("RouteDetail", {
                    pID: selectedID
                });
            }
        });
    });
