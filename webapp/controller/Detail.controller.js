sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "ediliciofinal/utils/constants/Constants"
],

    function (Controller, MessageBox, JSONModel, Constants) {
        "use strict";

        return Controller.extend("Constants.model.routes.Fragments.ControllerDetail", {

            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteDetail").attachPatternMatched(this.routeMatched, this);
                this.Odata = this.getView().getModel();
                var oDataModelo = { nombreEquipo: { NOMBRE: "", OFICIO: "", LIDER: "", COMPLETADAS: "", INCOMPLETAS: "", TELEFONO: "", IMAGEN: "" } }
                var oModelo = new JSONModel(oDataModelo);
                this.getView().setModel(oModelo, "mEquipo")
            },

            routeMatched: function (oEvent) {
                var oArgs, oView, Orden;
                oArgs = oEvent.getParameter("arguments");
                oView = this.getView();
                Orden = `${oArgs.pID}`
                oView.bindElement({
                    path: `/IdOrdenTrabajoSet('${oArgs.pID}')`,
                    events: {
                        dataRequested: function () {
                            oView.setBusy(true);
                        },
                        dataReceived: function () {
                            oView.setBusy(false);
                        }
                    }
                });
            },

            deleteTeam: function (oEvent) {
                var oList = oEvent.getSource(),
                    oItem = oEvent.getParameter("listItem"),
                    sPath = oItem.getBindingContext().getPath();
                var oDialog = new sap.m.Dialog({
                    title: "Confirmación de Planilla",
                    type: "Message",
                    content: new sap.m.Text({
                        text: "¿Está seguro de que desea eliminar al equipo?"
                    }),
                    beginButton: new sap.m.Button({
                        text: "Eliminar",
                        type: "Negative",
                        press: function () {
                            var OData = this.getView().getModel();
                            OData.remove(sPath);
                            oList.attachEventOnce("updateFinished", oList.focus, oList);
                            oDialog.close();
                        }.bind(this)
                    }),
                    endButton: new sap.m.Button({
                        text: "Cancelar",
                        press: function () {
                            oDialog.close();
                        }
                    })
                });
                oDialog.open();
            },

            createTeam: function () {
                var oView = this.getView();
                if (!this.openDialog) {
                    this.openDialog = sap.ui.xmlfragment("IdFragment", Constants.model.routes.Fragments.Dialog, this);
                    oView.addDependent(this.openDialog);
                }
                this.getView().getModel("mEquipo").setProperty("/nombreEquipo", {});
                this.openDialog.open();
            },

            openTeamDialog: function (oEvent) {
                var nombreEquipo = this.getView().getModel("mEquipo").getProperty("/nombreEquipo/NOMBRE")
                var oficioEquipo = this.getView().getModel("mEquipo").getProperty("/nombreEquipo/OFICIO")
                var liderEquipo = this.getView().getModel("mEquipo").getProperty("/nombreEquipo/LIDER")
                var completadasEquipo = this.getView().getModel("mEquipo").getProperty("/nombreEquipo/COMPLETADAS")
                var imcompletasEquipo = this.getView().getModel("mEquipo").getProperty("/nombreEquipo/INCOMPLETAS")
                var telefonoEquipo = this.getView().getModel("mEquipo").getProperty("/nombreEquipo/TELEFONO")
                var imagenEquipo = this.getView().getModel("mEquipo").getProperty("/nombreEquipo/IMAGEN")
                var idOrden = oEvent.getSource().getBindingContext().getProperty("IDORDENTRABAJO");
                var data = { "NOMBRE": nombreEquipo, "OFICIO": oficioEquipo, "LIDER": liderEquipo, "COMPLETADAS": completadasEquipo, "INCOMPLETAS": imcompletasEquipo, "TELEFONO": telefonoEquipo, "IMAGEN": imagenEquipo, "IDORDENTRABAJO": idOrden }
                var OData = this.getView().getModel();
                var sPath = "/EquiposTrabajoSet";
                OData.create(sPath, data, {
                    success: function (response) {
                    },
                    error: function (error) {
                    },
                })
                this.openDialog.close();
            },
            
            closeTeamDialog: function () {
                this.openDialog.close();
            },

            callTeam: function () {
                MessageBox.confirm("¿Desea comunicarse con el lider del equipo?", {
                    actions: [MessageBox.Action.OK, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function (sAction) {
                        MessageToast.show("OPCIÓN ELEGIDA: " + sAction);
                    }
                });
            }
        });
    }
    );