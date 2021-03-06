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
 * The lite version of GitHub branch
 *
 */
class GitHubPullRequestLiteBase {
  /**
   * Create a GitHubPullRequestLiteBase.
   * @property {string} [ref] The repository name
   * @property {string} [sha] The discription of repository
   * @property {object} [repo] The lite version of GitHub repository
   * @property {number} [repo.id] The repository id
   */
  constructor() {
  }

  /**
   * Defines the metadata of GitHubPullRequestLiteBase
   *
   * @returns {object} metadata of GitHubPullRequestLiteBase
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'GitHubPullRequestLite_base',
      type: {
        name: 'Composite',
        className: 'GitHubPullRequestLiteBase',
        modelProperties: {
          ref: {
            required: false,
            serializedName: 'ref',
            type: {
              name: 'String'
            }
          },
          sha: {
            required: false,
            serializedName: 'sha',
            type: {
              name: 'String'
            }
          },
          repo: {
            required: false,
            serializedName: 'repo',
            type: {
              name: 'Composite',
              className: 'GitHubPullRequestLiteBaseRepo'
            }
          }
        }
      }
    };
  }
}

module.exports = GitHubPullRequestLiteBase;
