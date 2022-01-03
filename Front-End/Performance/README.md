# Performance

Performance Budgets set standards for the performance of a site.

* It is a LIFESTYLE, not a thought exercise.

## Developer Notes

* [JavaScript](JavaScript.md)

## Tooling

| Budgets   | + Measurement | + Feedback     |
|-----------|---------------|----------------|
| Timing    | Lab Data      | CI Integration |
| Resources | Field Data    | Alerts         |
| Scores    |               |                |

## Budget Types

### Timing Metrics

Speed of ...

* to Load
* to Ready

**+** Direct measure of Page Performance<br/>
**-** High Variance

Max or Median (budget) against **consistent** environment.

### Resource-based Budget

Request count and size.

**+** Very consistent<br/>
**-** Indirect measure of Page Performance

| Size | Notes              |
|------|--------------------|
| 700k | Total, not helpful |
| 300k | JS, Helpful        |
| 250k | Images, Helpful    |
| 100k | Fonts, Helpful     |
| 50k  | CSS, Helpful       |
| 50k  | HTML, Helpful      |

JavaScript is **expensive**.

### Score-based Budget

**+** Easy to understand and communicate<br/>
**+/-** Fewer budgets to set

* Lighthouse
* WebPageTest

| Lab Data                         | Field Data                    |
|----------------------------------|-------------------------------|
| "Synthetic"                      | "real user monitoring (run)"  |
| Data is from **simulated** users | Data is from **actual** users |
| * Lighthouse                     | * Chrome UX Report (CrUX)     |
| * WebPageTest                    | * SpeedCurveLUX               |
| * HTTP Archive                   | * Analytics Data              |
| * Calibre                        |                               |

## Tools To Try

### BundleSize

(Budgets for file sizes, globbind and type of compression)

* Bootstrap
* Preact
* Lighthouse

### Webpack

(performance hits)

Warnings versus Errors

### Lighthouse

* npm
* Chrome Extension
* DevTools
* Lighthouse BOT
* Lighthouse Wallet

### Google Analytics

Custom Alerts ...

### Page Speed Insights


