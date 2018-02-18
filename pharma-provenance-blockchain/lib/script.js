/**
 * Track the delivery of a package from one partner to another
 * @param {org.e599.model.Delivery} delivery - the delivery to be processed
 * @transaction
 */
function receivePackage(delivery) {
    delivery.shipment.container.currentLocation = delivery.shipment.sendTo;
    return getAssetRegistry('org.e599.model.Container')
        .then(function (assetRegistry) {
            return assetRegistry.update(delivery.shipment.container);
        });
}