
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
    record.businessStep = 'Packing';
    record.action = "ADD";
    record.disposition = "in_progress";
    record.eventTime = packageTransaction.timestamp;
    record.locationText = packageTransaction.container.currentLocation.address;
    record.supplyChainPartnerText = packageTransaction.readPoint.company.companyName;

    getChildData(packageTransaction.container, record);
    if (record.itemText === 'MIXED') {
        var event = factory.newEvent('org.e599.model', 'MixedPackingEvent');
        event.record = record;
        emit(event);
    }

    return getAssetRegistry('org.e599.model.VisibilityRecord')
    .then(function (assetRegistry) {
        assetRegistry.add(record);
    });
}

/**
 * Track the unpacking of a container
 * @param {org.e599.model.UnpackTransaction} transaction - the unpack
 * @transaction
 */
function unpackContainer(transaction) {
    var factory = getFactory();

    transaction.container.packages = [];
    transaction.container.currentLocation = transaction.readPoint;

    getAssetRegistry('org.e599.model.ShippingContainer')
    .then(function (assetRegistry) {
        assetRegistry.update(packageTransaction.container);
    });

    var record = factory.newResource('org.e599.model', 'VisibilityRecord', transaction.transactionId);
    record.SSCC = transaction.container.SSCC;
    record.GTIN = transaction.container.GTIN;
    record.GLN = transaction.container.currentLocation.GLN;
    record.eventType = 'AggregateEvent';
    record.businessStep = 'Unpacking';
    record.action = "DELETE";
    record.disposition = "in_progress";
    record.eventTime = transaction.timestamp;
    record.locationText = transaction.container.currentLocation.address;
    record.supplyChainPartnerText = transaction.readPoint.company.companyName;

    getChildData(transaction.container, record);

    return getAssetRegistry('org.e599.model.VisibilityRecord')
    .then(function (assetRegistry) {
        assetRegistry.add(record);
    });
}

function getChildData(container, record) {
    var product = null;
    var packages = [];
    var item = null;
    container.packages.forEach(
        function(package) {
            package.currentLocation = container.currentLocation;
            packages.push(package.SGTIN);
            if (package.item.product.productName !== product) {
                if (product === null) {
                    product = package.item.product.productName
                    item = package.item.dosage + ' ' + package.item.unit;
                } else {
                    product = 'MIXED';
                    item = 'MIXED';
                }
            }
    });
    record.SGTINs = packages;
    record.productText = product;
    record.itemText = item;

    return getAssetRegistry('org.e599.model.IndividualPackage')
    .then(function (assetRegistry) {
        container.packages.forEach(
            function(package) {
                assetRegistry.update(package);
            }
        );                
    });
}

/**
 * Track a partner shipping a container to another partner.
 * @param {org.e599.model.ShipTransaction} shipTransaction - the delivery to be processed
 * @transaction
 */
function shipPackage(shipTransaction) {
    var factory = getFactory();
    
    // The container shouldn't have moved yet,
    // but we'll always update the location to the latest read point.
    shipTransaction.container.currentLocation = shipTransaction.readPoint;

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
    record.supplyChainPartnerText = shipTransaction.readPoint.company.companyName;

    getChildData(shipTransaction.container, record);

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
    record.locationText = receiveTransaction.readPoint.address;
    record.eventTime = receiveTransaction.timestamp;
    record.supplyChainPartnerText = receiveTransaction.readPoint.company.companyName;

    getChildData(receiveTransaction.container, record);

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