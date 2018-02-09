/**
 * Track the shipment of a package from one partner to another
 * @param {org.gloco.model.Shipment} ship - the shipment to be processed
 * @transaction
 */
function shipPackage(shipment) {
    shipment.package.owner = shipment.receiver;
    return getAssetRegistry('org.gloco.model.IndividualPackage')
        .then(function (assetRegistry) {
            return assetRegistry.update(shipment.package);
        });
}