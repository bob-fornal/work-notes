# Advanced GitHub Actions

## Environment Protection Rules

* Manual Approvers

## Composite Actions

* Reduce code duplication

```yaml
# action.yml

runs:
  using: "composite"
  steps:
    - uses: docker/setup-buildx-action@v1

    - uses: docker/login-action@v1
      with:
        ...
    
    - uses: docker/build-push-action@v2
      with:
        ...
```
