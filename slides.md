---
theme: penguin
colorSchema: 'auto'
layout: intro
themeConfig:
  # logoHeader: 'https://github.com/lirantal.png'
  eventLogo: 'https://res.cloudinary.com/snyk/image/upload/v1537345894/press-kit/brand/logo-monochrome.png'
  eventUrl: 'https://snyk.io'
  twitter: '@liran_tal'
  twitterUrl: 'https://twitter.com/liran_tal'

---

# A subtle introduction to supply chain security and container signing with Sigstore and Cosign

\- Liran Tal 2022 -

<div class="pt-12">
  <span @click="next" class="px-2 p-1 rounded cursor-pointer hover:bg-white hover:bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

---
layout: presenter
eventLogo: 'https://img2.storyblok.com/352x0/f/84560/2388x414/23d8eb4b8d/vue-amsterdam-with-name.png'
eventUrl: 'https://vuejs.amsterdam/'
twitter: '@alvarosabu'
twitterUrl: 'https://twitter.com/alvarosabu'
presenterImage: 'https://github.com/lirantal.png'
---

# Liran Tal

Senior Front-end Engineer at <fancy-link href="https://snyk.io">Snyk</fancy-link>

- Developer Advocate
- Say hi at <fancy-link href="https://twitter.com/alvarosabu">@alvarosabu</fancy-link>

---
layout: quote
class: "text-center mt-16"
---

# "We have so far seen an attempted exploit of over 48% of corporate networks globally."

Check Point Software
<br/>
https://blog.checkpoint.com/2021/12/11/protecting-against-cve-2021-44228-apache-log4j2-versions-2-14-1/

---
layout: new-section
---

![check point research shows multiple variants over a week](https://blog.checkpoint.com/wp-content/uploads/2021/12/variants-700x408.jpg)

<!--
Check Point Research witnessed new variations of the original exploit being introduced rapidly- over 60 in less than 24 hours.
When we discussed the Cyber pandemic, this is exactly what we meant – quickly spreading devastating attacks.
-->

Check Point Software
<br/>
https://blog.checkpoint.com/2021/12/11/protecting-against-cve-2021-44228-apache-log4j2-versions-2-14-1/

---
layout: quote
class: "text-center mt-16"
---

# "It is estimated that there will be four times more supply chain attacks in 2021 than in 2020."

The European Union Agency for Cybersecurity (ENISA)
<br/>
https://www.enisa.europa.eu/publications/threat-landscape-for-supply-chain-attacks

<!--
2022 stat: 66% of supply chain attacks focus on the supplier's code?

Key takeaways from the report:

  20% of supply chain attacks targeted data
  12% of attackers focused on suppliers’ internal processes
  16% of attacks targeted people
  8% of attacks sought out financial assets
  In over 60% of attacks, threat actors deployed malicious code
-->

---
layout: quote
class: "text-center mt-16"
---

# "Sysdig reports that 75% of containers run with critical or high vulnerabilities, and 76% are running as root. Incredibly, these numbers are worse than the previous year’s in which 58% were running as root"

Sysdig
<br/>
https://sysdig.com/2022-cloud-native-security-and-usage-report

---
layout: text-image
media: ./assets/fedora-packaging-guidelines-0.png
---

# Fedora Packaging Guidelines

"These documents cover the fine details of acceptable Fedora packaging"

---
layout: text-image
media: ./assets/fedora-packaging-guidelines-1.png
---

# Fedora Packaging Guidelines<sup>1</sup>


- Naming convention for npm modules?
- Versioning for npm modules?
- Concepts for Libraries vs Packages

<footer class="text-xs absolute bottom-12 left-5 right-0 p-2">
[1]: https://docs.fedoraproject.org/en-US/packaging-guidelines
</footer>

---
layout: text-image
media: ./assets/fedora-packaging-guidelines-2.png
---

# Fedora Packaging Guidelines

- Security vulnerabilities policies
- Source file verifications
- Package dependencies

---
layout: text-image
media: ''
---

# npmjs registry packaging guidelines

?????

---
layout: text-image
media: ./assets/npmjs-packaging-guideslines-0.png
---

# npmjs registry packaging guidelines<sup>1</sup>

- Security section about setting up 2FA
- PGP Signatures as maintainers
- Package name guidelines

<footer class="text-xs absolute bottom-12 left-5 right-0 p-2">
[1]: https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry
</footer>

---
layout: new-section
---

# What is supply chain security?

---
layout: new-section
---

![supply chain security diagram](https://slsa.dev/images/SupplyChainDiagram.svg)

<!--
Touch-points of software development from a lifecycle perspective

Any software can introduce vulnerabilities into a supply chain. As a system gets more complex, it’s critical to already have checks and best practices in place to guarantee artifact integrity, that the source code you’re relying on is the code you’re actually using.
-->

---
layout: new-section
---

![supply chain security diagram](https://slsa.dev/images/supply-chain-threats.svg)

<!--

Understanding these threat models, such as
- the tools I use to develop software could be compromised and used to inject trojans and backdoors
- my source code repository could be compromised if I don't enable 2FA on my GitHub account
- the origin of source that I use to build my software could be compromised, such as malicious dependencies
- what if malicious actors go straight to the package repository and modify the published artifact?

but is this all in my head?
am I just being over paranoid?
-->

---

# Real-world supply chain security examples

- SolarWinds
- Codecov
- Linux kernel source code
- Event-stream

<!--
High profile attacks like SolarWinds, Codecov or Linux hypocrite commits exploit the kind of supply chain integrity vulnerabilities which may go unnoticed or be underdeveloped, and quickly become extremely public, disruptive and costly in today’s environment. 
-->

---

# How do we solve these issues?

What if we had asked:

- Who built this software artifact ?
- How and where did they build it ?

<!--
How do these questions relate in practice to a software development lifecycle?

Let's break it down to theory and in-practice examples
-->

---
layout: text-image
media: https://slsa.dev/images/build-model.svg
---

# The build model

Composed of:

- Source
- Build
- Dependencies
- Trigger
- Platform/admin
- Outputs

<!--
Explanation for each of these terms:

Platform 	System that allows tenants to run build. Technically, it is the transitive closure of software and services that must be trusted to faithfully execute the build.
Service 	A platform that is hosted, not a developer’s machine. (Term used in requirements.)
Build 	Process that converts input sources and dependencies into output artifacts, defined by the tenant and executed within a single environment.
Steps 	The set of actions that comprise a build, defined by the tenant.
Environment 	Machine, container, VM, or similar in which the build runs, initialized by the platform. In the case of a distributed build, this is the collection of all such machines/containers/VMs that run steps.
Trigger 	External event or request causing the platform to run the build.
Source 	Top-level input artifact required by the build.
Dependencies 	Additional input artifacts required by the build.
Outputs 	Collection of artifacts produced by the build.
Admin 	Person with administrative access to the platform, potentially allowing them to tamper with the build process or access secret material.

-->

---
layout: text-image
media: https://slsa.dev/images/build-model.svg
---

# The build model

If this was GitHub Actions...

- <strong>Source</strong>: git commit defining the workflow
- <strong>Build</strong>: Workflow or job
- <strong>Dependencies</strong>: any other artifacts fetched during execution
- <strong>Trigger</strong>: workflow trigger
- <strong>Platform/admin</strong>: GitHub Actions + runner / GitHub personnel
- <strong>Outputs</strong>: a tagged release, npm package, or other artifact


---
layout: new-section
---

# Getting started with SLSA and Sigstore

---

# What is SLSA ?

<strong>S</strong>upply-chain <strong>L</strong>evels for <strong>S</strong>oftware <strong>A</strong>rtifacts

- Open source framework for managing supply chain security<sup>1</sup>
- How do you verify a software package?
- What does a secure supply chain look like?
- For consumers, mostly focused on <strong>verifying software artifacts</strong>

[1]: http://slsa.dev/

<!--

- Designed to improve the integrity of software packages and infrastructure
- How to handle artifacts without provenance?
- What should your security policies check?

-->

---

# Supply chain security for consumers

What should you verify for a given artifact that was produced?
Provenance and source attestations, composed of:
  - When
  - Where
  - How

<br/><br/>
Attestation:

noun,
evidence or proof of something.

<br/><br/>
A provenance is a set of attestations.

<!--
Provenance, per [slsa's definition](https://slsa.dev/provenance), is an attestation that some entity (builder) produced one or more software artifacts (the subject of an in-toto attestation Statement) by executing some invocation, using some other artifacts as input (materials).
-->

---
layout: text-image
media: https://slsa.dev/images/provenance/v0.2/provenance.svg
---

# Provenance

- Inputs to the build process
- The configuration used to build the artifact
- The builder
- The output: subject

<!--

@TODO:
Turn this diagram into a practical GitHub Action that points out the actual information and how the Schema (as shown in https://slsa.dev/provenance/v0.2) is used with real values to help convey how the information is actually used.

The actual output for the schema exists as part of the examples in that web page, scroll down!

-->

---
layout: text-image
media: https://slsa.dev/images/provenance/v0.2/provenance.svg
---

# Provenance

Remember *Reflections on Trusting Trust* ?

<br/><br/>
You still have to put your trust somewhere.
<br/>
<strong>You have to trust the builder</strong>.

<br/><br/>
So, what information do you need to prove that the artifact is trustworthy?

---

# Provenance schema

An In-Toto Attestation Spec, made up of the following:

```js
{
    Subject: {} // the artifact
    Envelope: {}, // authentication
    Statement: {}, // identify the spec
    Predicate: {}, // metadata about the subject
}
```

---

# Provenance schema

```js
{
  // Standard attestation fields:
  "_type": "https://in-toto.io/Statement/v0.1",
  "subject": [{ ... }],

  // Predicate:
  "predicateType": "https://slsa.dev/provenance/v0.2",
  "predicate": {
    "builder": {
      "id": "<URI>"
    },
    "buildType": "<URI>",
  }
}
```


---

# Provenance schema

```js
{
  // Standard attestation fields:
  "_type": "https://in-toto.io/Statement/v0.1",
  "subject": [{ ... }],

  // Predicate:
  "predicateType": "https://slsa.dev/provenance/v0.2",
  "predicate": {
    "builder": {
        "id": "https://github.com/Attestations/GitHubHostedActions@v1"
    }
    "buildType": "https://github.com/Attestations/GitHubActionsWorkflow@v1",
  }
}
```

---

# Provenance schema

```js
{
    "invocation": {
      "configSource": {
        "uri": "<URI>",
        "digest": { /* DigestSet */ },
        "entryPoint": "<STRING>"
      },
      "parameters": { /* object */ },
      "environment": { /* object */ }
    },
}
```

---

# Provenance schema

```js
{
"invocation": {
    "configSource": {
        "entryPoint": "build.yaml:build",
        "uri": "git+https://github.com/foo/bar.git",
        "digest": {"sha1": "abc..."}
    },
    }
}
```

<!--
entrypoint: // The git repo that contains the build.yaml referenced in the entrypoint.
digest: // The resolved git commit hash reflecting the version of the repo used
        // for this build.
-->

---

# Provenance schema

```js
{
"environment": {
    "arch": "amd64",
    "env": {
    "GITHUB_RUN_ID": "1234",
    "GITHUB_RUN_NUMBER": "5678",
    "GITHUB_EVENT_NAME": "push"
    },
    "context": {
        "github": {
            "run_id": "abcd1234"
        },
        "runner": {
            "os": "Linux",
            "temp": "/tmp/tmp.iizj8l0XhS",
        }
    }
    }
}
```

<!--
arch: The architecture of the runner.

env:
    Environment variables. These are always set because it is not possible
    to know whether they were referenced or not.

context:
    The context values that were referenced in the workflow definition.
    Secrets are set to the empty string.

-->


---


# Provenance schema

```js
{
    "buildConfig": { /* object */ },
    "metadata": {
      "buildInvocationId": "<STRING>",
      "buildStartedOn": "<TIMESTAMP>",
      "buildFinishedOn": "<TIMESTAMP>",
      "completeness": {
        "parameters": true,
        "environment": true,
        "materials": true
      },
      "reproducible": true
    },
}
```

---

# The missing piece in the provenance

The generated provenance file merely... a file.
What stops third-parties from tampering with the file?

This is where signature and verification process steps in.

---

# Provenance verification

- Cryptographically signed 
- Verifiable by consumers
- 

---
layout: text-image
media: https://miro.medium.com/max/1400/0*KmTC30XvLld--Z3K
---

# A signed provenance

A Key pair + artifact ==> Signature

<!--

In fact, we can now make another concept more clear and that, is 
to better describe the definition of an attestation.
-->

---
layout: text-image
media: https://miro.medium.com/max/1400/0*D_JefNxE3SXBKPgI
---

# Attestations & Statements

- A statement is a reference to a subject (artifact) and a claim about it
- When a statement is signed, it is an attestation

---
layout: text-window
---

# Sign your container image

Getting started with installing cosign

::window::

```bash
$ brew install cosign
```

---
layout: text-window
---

# Sign your container image

Generate a public-private key-pair

```bash
$ cosign generate-key-pair
```

::window::

```bash
Enter password for private key:
Enter again:

Private key written to cosign.key
Public key written to cosign.pub
```

---

# Sign your container image

Make the key-pair available to your CI / GitHub Actions:
- Go to repository settings
- Go to secrets management
- Create new secret environment settings:
  - COSIGN_PUBLIC_KEY
  - COSIGN_PRIVATE_KEY
  - COSIGN_PASSWORD

---
layout: text-window
---

# Sign your container image

Update your GitHub Actions workflow file:
1. Build the container image
2. Publish it to registry
3. Sign it! 👉

::window::

```yaml
- name: Cosign install
  uses: sigstore/cosign-installer@v2.4.0
        
- name: Sign the published container image
  env:
    COSIGN_PRIVATE_KEY: ${{ secrets.COSIGN_PRIVATE_KEY }}
    COSIGN_PASSWORD: ${{ secrets.COSIGN_PASSWORD }}
    TAGS: ${{ steps.meta.outputs.tags }}
  run: cosign sign --key env://COSIGN_PRIVATE_KEY ${TAGS}
```

---
layout: text-window
---

# Sign container image with more attestations

Basic signing doesn't include any extra metadata
about the image's provenance.

1. Where was it built?
2. What is the commit that triggered a build?
3. What is the name of the workflow for this build?

::window::

```yaml
- name: Sign the published container image
  env:
    COSIGN_PRIVATE_KEY: ${{ secrets.COSIGN_PRIVATE_KEY }}
    COSIGN_PASSWORD: ${{ secrets.COSIGN_PASSWORD }}
    TAGS: ${{ steps.meta.outputs.tags }}
  run: |
    cosign sign --key env://COSIGN_PRIVATE_KEY ${TAGS} \
      -a "repo=${{ github.repository }}" \
      -a "workflow=${{ github.workflow }}" \
      -a "ref=${{ github.sha }}" \
      -a "actor=${{ github.actor }}" \
      -a "build=${{ github.run_id }}"
```

---
layout: text-window
---

# Verify container images

Verifying the container image provenance:
1. Requires the public key
2. Pipes to `jq` for pretty-ness

```bash
$ cosign verify ghcr.io/lirantal/dockly --key cosign.pub  | jq
```

::window::

```bash
  - The cosign claims were validated
  - The signatures were verified against the specified public key
[
  {
    "critical": {
      "identity": {
        "docker-reference": "ghcr.io/lirantal/dockly"
      },
      "image": {
        "docker-manifest-digest": "sha256:2bbff3db48fcae016aa2d2116834723591a40335f47be6df81c532170b45776b"
      },
      "type": "cosign container image signature"
    },
    "optional": {
      "actor": "lirantal",
      "build": "2535552796",
      "ref": "a40c60c8dc6d8d970431606b87df01dc71486b6c",
      "repo": "lirantal/dockly",
      "workflow": "Docker: GitHub Packages"
    }
  }
]
```

---

# Signing container images

## Caveats:

1. cosign signatures are stored as separate objects in the OCI registry
2. cosign only supports Red Hat's simple signing format for payloads

<!--
cosign signatures are stored as separate objects in the OCI registry, with only a weak reference back to the object they "sign". This means this relationship is opaque to the registry, and signatures will not be deleted or garbage-collected when the image is deleted. Similarly, they can easily be copied from one environment to another, but this is not automatic.
-->

---

# SLSA Levels and Verification types

<!--
@TODO continue here with the SLSA levels and verification types:
https://slsa.dev/spec/v0.1/levels
-->
