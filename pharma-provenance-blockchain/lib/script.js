
/**
 * Track the delivery of a package from one partner to another
 * @param {org.e599.model.PackageTransaction} packageTransaction - the package order
 * @transaction
 */
function packageContainer(packageTransaction) {
    packageTransaction.container.packages = packageTransaction.contents;
    // TODO: loop through individual packages and set current container.

    return getAssetRegistry('org.e599.model.Container')
    .then(function (assetRegistry) {
        return assetRegistry.update(packageTransaction.container);
    });

    //TODO: Log that individual items were added to a container
}

/**
 * Track the delivery of a package from one partner to another
 * @param {org.e599.model.DeliveryTransaction} delivery - the delivery to be processed
 * @transaction
 */
function receivePackage(delivery) {
    var factory = getFactory();

    delivery.shipment.container.currentLocation = delivery.shipment.sendTo;
    
    var receipt = factory.newResource('org.e599.model', 'GoodsReceived', delivery.shipment.sscc);
    receipt.gtin = delivery.shipment.container.gtin;
    receipt.gln = delivery.shipment.sendTo.gln;

    getAssetRegistry('org.e599.model.GoodsReceived')
        .then(function (assetRegistry) {
            assetRegistry.add(receipt);
        });

    return getAssetRegistry('org.e599.model.Container')
        .then(function (assetRegistry) {
            return assetRegistry.update(delivery.shipment.container);
        });
}