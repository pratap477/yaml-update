<p align="center">
  <a href="https://github.com/marketplace/actions/yaml-update-action"><img alt="dynamic-yaml-update status" src="https://github.com/devgioele/modern-typescript-action/workflows/Verification/badge.svg"></a>
</p>

# YAML Update Action

Update values in an existing YAML

```javascript
jobs:
  test-multiple-value-changes:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses:  pratap477/yaml-update@v2
        with:
          changes: |
             {
                "grafana-values.yml": {
                  "grafana.ini": {
                    "server": {
                      "root_url": "http://monitoring"
                    }
                  }
                }
              }
```
