import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for angular-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be angular-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('angular-app');
    })
  });

  it('navbar-brand should be pharma-provenance-blockchain@0.0.1',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('pharma-provenance-blockchain@0.0.1');
  });

  
    it('Batch component should be loadable',() => {
      page.navigateTo('/Batch');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Batch');
    });

    it('Batch table should have 6 columns',() => {
      page.navigateTo('/Batch');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  
    it('Product component should be loadable',() => {
      page.navigateTo('/Product');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Product');
    });

    it('Product table should have 4 columns',() => {
      page.navigateTo('/Product');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });

  
    it('Item component should be loadable',() => {
      page.navigateTo('/Item');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Item');
    });

    it('Item table should have 6 columns',() => {
      page.navigateTo('/Item');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  
    it('ShippingContainer component should be loadable',() => {
      page.navigateTo('/ShippingContainer');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('ShippingContainer');
    });

    it('ShippingContainer table should have 6 columns',() => {
      page.navigateTo('/ShippingContainer');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  
    it('IndividualPackage component should be loadable',() => {
      page.navigateTo('/IndividualPackage');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('IndividualPackage');
    });

    it('IndividualPackage table should have 5 columns',() => {
      page.navigateTo('/IndividualPackage');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });

  
    it('Location component should be loadable',() => {
      page.navigateTo('/Location');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Location');
    });

    it('Location table should have 4 columns',() => {
      page.navigateTo('/Location');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });

  
    it('VisibilityRecord component should be loadable',() => {
      page.navigateTo('/VisibilityRecord');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('VisibilityRecord');
    });

    it('VisibilityRecord table should have 12 columns',() => {
      page.navigateTo('/VisibilityRecord');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(12); // Addition of 1 for 'Action' column
      });
    });

  

});
