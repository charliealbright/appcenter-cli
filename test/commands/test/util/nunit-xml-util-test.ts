import { expect } from "chai";
import { DOMParser, XMLSerializer } from "xmldom";
import * as xmlLib from "libxmljs";
import * as path from "path";
import { NUnitXmlUtil } from "../../../../src/commands/test/lib/nunit-xml-util";

describe("nunit xml util", function () {
  const strXml =
'<?xml version="1.0" encoding="utf-8"?>\
<test-results ignored="1" not-run="1">\
<test-suite>\
<test-case name="CreditCardValidator.Droid.UITests.Tests.Test0" executed="True" result="Success">\
<reason>\
<message><![CDATA[]]></message>\
</reason>\
</test-case>\
<test-case name="CreditCardValidator.Droid.UITests.Tests.Test1" executed="False" result="Ignored">\
<reason>\
<message><![CDATA[]]></message>\
</reason>\
</test-case>\
</test-suite>\
<test-suite>\
</test-suite>\
</test-results>';

  const strXml1 =
'<?xml version="1.0" encoding="utf-8"?>\
<test-results ignored="1" not-run="1">\
<test-suite>\
  <test-suite>\
  </test-suite>\
</test-suite>\
<test-suite>\
</test-suite>\
</test-results>';

  const xmlUtil: NUnitXmlUtil = new NUnitXmlUtil();

  it("should collect all elements", () => {
    let xml: Document = new DOMParser().parseFromString(strXml);
    const testCases: Node[] = xmlUtil.collectAllElements(xml, "test-case");
    let testSuites: Node[] = xmlUtil.collectAllElements(xml, "test-suite");

    expect(testCases.length).to.eql(2);
    expect(testSuites.length).to.eql(2);

    xml = new DOMParser().parseFromString(strXml1);
    testSuites = xmlUtil.collectAllElements(xml, "test-suite");

    expect(testSuites.length).to.eql(3);
  });

  it("should not throw an exception for a non-existent node", () => {
    const xml: Document = new DOMParser().parseFromString(strXml);
    const testCases: Node[] = xmlUtil.collectAllElements(xml, "non-existent-test-case");

    expect(testCases.length).to.eql(0);
  });

  it("should append postfix", () => {
    const xml: Document = new DOMParser().parseFromString(strXml);
    xmlUtil.appendToTestNameTransformation(xml, "_new_test_case_postfix");
    const testCases: Node[] = xmlUtil.collectAllElements(xml, "test-case");

    expect(testCases[0].attributes.getNamedItem("name").value)
      .to.eql("CreditCardValidator.Droid.UITests.Tests.Test0_new_test_case_postfix");
    expect(testCases[1].attributes.getNamedItem("name").value)
      .to.eql("CreditCardValidator.Droid.UITests.Tests.Test1_new_test_case_postfix");
  });

  it("should not throw an exception while appending postfix to a non-existent node", () => {
    const xml: Document = new DOMParser().parseFromString(strXml1);
    xmlUtil.appendToTestNameTransformation(xml, "_new_test_case_postfix");
    const testCases: Node[] = xmlUtil.collectAllElements(xml, "test-case");

    expect(testCases.length).to.eql(0);
  });

  it("should remove ignored transformation", () => {
    const xml: Document = new DOMParser().parseFromString(strXml);
    xmlUtil.removeIgnoredTransformation(xml);
    const testCases: Node[] = xmlUtil.collectAllElements(xml, "test-case");
    const testResults: Node = xmlUtil.collectAllElements(xml, "test-results")[0];
    const ignoredAttr: Attr = testResults.attributes.getNamedItem("ignored");
    const notRunAttr: Attr = testResults.attributes.getNamedItem("not-run");

    expect(testCases.length).to.eql(1);
    expect(ignoredAttr.value).to.eql("0");
    expect(notRunAttr.value).to.eql("0");
  });

  it("should remove empty suites", () => {
    const xml: Document = new DOMParser().parseFromString(strXml);
    let testSuites: Node[] = xmlUtil.collectAllElements(xml, "test-suite");

    expect(testSuites.length).to.eql(2);

    xmlUtil.removeEmptySuitesTransformation(xml);
    testSuites = xmlUtil.collectAllElements(xml, "test-suite");

    expect(testSuites.length).to.eql(1);
  });

  it("should collect only first level children", () => {
    const xml: Document = new DOMParser().parseFromString(strXml1);
    const testSuites: Node[] = xmlUtil.collectChildren(xml, "test-suite");

    expect(testSuites.length).to.eql(2);
  });

  it("should count all children", () => {
   const xml: Document = new DOMParser().parseFromString(strXml);
   const testResults: Node = xmlUtil.collectChildren(xml, "test-results")[0];

   expect(xmlUtil.countChildren(testResults)).to.eql(8);
  });

  it("should not throw an exception if get null values", () => {
    let result: Node[] = xmlUtil.collectAllElements(null, "");
    expect(result.length).to.eql(0);

    result = xmlUtil.collectAllElements({} as Node, null);
    expect(result.length).to.eql(0);

    result = xmlUtil.collectChildren(null, "");
    expect(result.length).to.eql(0);

    result = xmlUtil.collectChildren({} as Node, null);
    expect(result.length).to.eql(0);

    expect(xmlUtil.countChildren(null)).to.eql(0);
  });

  it("should combine xmls correctly", async () => {

    // If
    const pathToArchive: string = path.join(__dirname, "../resources/nunit_xml_zip.zip");

    // When
    const xml: Document = await xmlUtil.mergeXmlResults(pathToArchive);

    // Then
    const finalStrXml = new XMLSerializer().serializeToString(xml);

    // Doesn't throw exception
    xmlLib.parseXml(finalStrXml);
  });
});