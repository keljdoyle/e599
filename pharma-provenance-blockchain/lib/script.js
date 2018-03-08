
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
 * Track a partner shipping a container to another partner.
 * @param {org.e599.model.ShipTransaction} shipping - the delivery to be processed
 * @transaction
 */
function shipPackage(shipping) {
    var factory = getFactory();
    
    var record = factory.newResource('org.e599.model', 'VisibilityRecord', shipping.transactionId);
    record.sscc = shipping.shipment.sscc;
    record.gtin = shipping.shipment.container.gtin;
    record.gln = shipping.shipment.sendFrom.gln;
    record.eventType = 'ObjectEvent';
    record.businessStep = 'Shipping';
    record.action = "OBSERVE";
    record.disposition = "in_process";
    record.eventTime = shipping.timestamp;

    getAssetRegistry('org.e599.model.VisibilityRecord')
        .then(function (assetRegistry) {
            assetRegistry.add(record);
        });

    var event = factory.newEvent('org.e599.model', 'VisibilityEvent');
    event.record = record;
    emit(event);

    return getAssetRegistry('org.e599.model.Container')
        .then(function (assetRegistry) {
            return assetRegistry.update(shipping.shipment.container);
        });
}

/**
 * Track the delivery of a package from one partner to another
 * @param {org.e599.model.ReceiveTransaction} delivery - the delivery to be processed
 * @transaction
 */
function receivePackage(delivery) {
    var factory = getFactory();

    delivery.shipment.container.currentLocation = delivery.shipment.sendTo;
    
    var record = factory.newResource('org.e599.model', 'VisibilityRecord', delivery.transactionId);
    record.sscc = delivery.shipment.sscc;
    record.gtin = delivery.shipment.container.gtin;
    record.gln = delivery.shipment.sendTo.gln;
    record.eventType = 'ObjectEvent';
    record.businessStep = 'Receiving';
    record.action = "OBSERVE";
    record.disposition = "in_process";
    record.eventTime = delivery.timestamp;

    getAssetRegistry('org.e599.model.VisibilityRecord')
        .then(function (assetRegistry) {
            assetRegistry.add(record);
        });

    var event = factory.newEvent('org.e599.model', 'VisibilityEvent');
    event.record = record;
    emit(event);

    return getAssetRegistry('org.e599.model.Container')
        .then(function (assetRegistry) {
            return assetRegistry.update(delivery.shipment.container);
        });
}