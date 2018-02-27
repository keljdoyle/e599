
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
    
    var pod = factory.newResource('org.e599.model', 'ProofOfDelivery', delivery.shipment.sscc);
    pod.gtin = delivery.shipment.container.gtin;
    pod.gln = delivery.shipment.sendTo.gln;

    getAssetRegistry('org.e599.model.ProofOfDelivery')
        .then(function (assetRegistry) {
            assetRegistry.add(pod);
        });

    return getAssetRegistry('org.e599.model.Container')
        .then(function (assetRegistry) {
            return assetRegistry.update(delivery.shipment.container);
        });
}