/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

/**
 * Class representing a DataSubjectRighBlobContainerInfo.
 */
class DataSubjectRighBlobContainerInfo {
  /**
   * Create a DataSubjectRighBlobContainerInfo.
   * @property {string} sasUri
   * @property {string} blobPath
   */
  constructor() {
  }

  /**
   * Defines the metadata of DataSubjectRighBlobContainerInfo
   *
   * @returns {object} metadata of DataSubjectRighBlobContainerInfo
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'DataSubjectRighBlobContainerInfo',
      type: {
        name: 'Composite',
        className: 'DataSubjectRighBlobContainerInfo',
        modelProperties: {
          sasUri: {
            required: true,
            serializedName: 'sasUri',
            type: {
              name: 'String'
            }
          },
          blobPath: {
            required: true,
            serializedName: 'blobPath',
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = DataSubjectRighBlobContainerInfo;
