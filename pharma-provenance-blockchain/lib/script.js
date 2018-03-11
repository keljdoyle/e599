
/**
 * Track the delivery of a package from one partner to another
 * @param {org.e599.model.PackageTransaction} packageTransaction - the package order
 * @transaction
 */
function packageContainer(packageTransaction) {
    var factory = getFactory();

    packageTransaction.container.packages = packageTransaction.contents;
    packageTransaction.container.currentLocation = packageTransaction.readPoint;

    getAssetRegistry('org.e599.model.ShippingContainer')
    .then(function (assetRegistry) {
        assetRegistry.update(packageTransaction.container);
    });

    var record = factory.newResource('org.e599.model', 'VisibilityRecord', packageTransaction.transactionId);
    record.SSCC = packageTransaction.container.SSCC;
    record.GTIN = packageTransaction.container.GTIN;
    record.GLN = packageTransaction.container.currentLocation.GLN;
    record.eventType = 'AggregateEvent';
    record.businessStep = 'Packaging';
    record.action = "ADD";
    record.disposition = "in_progress";
    record.eventTime = packageTransaction.timestamp;
    record.locationText = packageTransaction.container.currentLocation.address;

    return getAssetRegistry('org.e599.model.VisibilityRecord')
    .then(function (assetRegistry) {
        assetRegistry.add(record);
    });
}

/**
 * Track a partner shipping a container to another partner.
 * @param {org.e599.model.ShipTransaction} shipTransaction - the delivery to be processed
 * @transaction
 */
function shipPackage(shipTransaction) {
    var factory = getFactory();
    
    var packages = [];
    shipTransaction.container.packages.forEach(
        function(package) {
            packages.push(package.SGTIN);
    });

    var record = factory.newResource('org.e599.model', 'VisibilityRecord', shipTransaction.transactionId);
    record.SSCC = shipTransaction.container.SSCC;
    record.GTIN = shipTransaction.container.GTIN;
    record.GLN = shipTransaction.readPoint.GLN;
    record.eventType = 'ObjectEvent';
    record.businessStep = 'Shipping';
    record.action = "OBSERVE";
    record.disposition = "in_transit";
    record.eventTime = shipTransaction.timestamp;
    record.locationText = shipTransaction.readPoint.address;
    record.SGTINs = packages;


    getAssetRegistry('org.e599.model.VisibilityRecord')
    .then(function (assetRegistry) {
        assetRegistry.add(record);
    });

    var event = factory.newEvent('org.e599.model', 'VisibilityEvent');
    event.record = record;
    emit(event);

    return getAssetRegistry('org.e599.model.ShippingContainer')
    .then(function (assetRegistry) {
        return assetRegistry.update(shipTransaction.container);
    });
}

/**
 * Track the delivery of a package from one partner to another
 * @param {org.e599.model.ReceiveTransaction} receiveTransaction - the delivery to be processed
 * @transaction
 */
function receivePackage(receiveTransaction) {
    var factory = getFactory();

    receiveTransaction.container.currentLocation = receiveTransaction.readPoint;
    
    var record = factory.newResource('org.e599.model', 'VisibilityRecord', receiveTransaction.transactionId);
    record.SSCC = receiveTransaction.container.SSCC;
    record.GTIN = receiveTransaction.container.GTIN;
    record.GLN = receiveTransaction.readPoint.GLN;
    record.eventType = 'ObjectEvent';
    record.businessStep = 'Receiving';
    record.action = "OBSERVE";
    record.disposition = "in_process";
    record.eventTime = receiveTransaction.timestamp;

    getAssetRegistry('org.e599.model.VisibilityRecord')
        .then(function (assetRegistry) {
            assetRegistry.add(record);
        });

    var event = factory.newEvent('org.e599.model', 'VisibilityEvent');
    event.record = record;
    emit(event);

    return getAssetRegistry('org.e599.model.ShippingContainer')
    .then(function (assetRegistry) {
        return assetRegistry.update(receiveTransaction.container);
    });
}