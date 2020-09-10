# Changelog

All notable changes are being documented in this file.

Types of changes:

1. **Added** for new features.
1. **Changed** for changes in existing functionality.
1. **Deprecated** for soon-to-be removed features.
1. **Removed** for now removed features.
1. **Fixed** for any bug fixes.
1. **Security** in case of vulnerabilities.
1. **Breaking** for breaking changes
1. **Docs** for documentation changes
1. **Lab** components and features that are still in a work in progress

## Next
### Added
- `<FontUpgrade/>` - [Testkit] Add isActive function [#5936](https://github.com/wix/wix-style-react/pull/5936)
- `<RichTextInputArea/>` - add puppeteer support for enterText testkit method [#5930](https://github.com/wix/wix-style-react/pull/5930)
- `<StatisticsWidget/>` - support content alignment using the alignItems prop [#5931](https://github.com/wix/wix-style-react/pull/5931)
- `<StatisticsWidget/>` - show dashes for empty values [#5935](https://github.com/wix/wix-style-react/pull/5935)

### fixed:
- `<RadioGroup/>`, `<MessageModelLayout/>`, `<CustomModalLayout/>`, `<BaseModalLayout/>` - support using dir="rtl" instead of className="rtl" [#5941](https://github.com/wix/wix-style-react/pull/5941)
### Docs:
- `<MessageModalLayout>` - move out from the WIP list [#5944](https://github.com/wix/wix-style-react/pull/5944)
- `<BadgeSelect/>` - refactor story page and some improvements

## 9.8.0 - 2020-09-07
### Added
- `<Breadcrumbs />` - show ellipsis for long texts [#5843](https://github.com/wix/wix-style-react/pull/5843)
- `<MarketingPageLayout/>` - new component [#5909](https://github.com/wix/wix-style-react/pull/5909)

### Changed
- `<StatisticsWidget/>` - update description style to support tiny size [#5933](https://github.com/wix/wix-style-react/pull/5933)

### Fixed
- `<TextButton/>` - prevent the affection of a global css - "box-sizing" [#5917](https://github.com/wix/wix-style-react/pull/5917)
- `<CounterBadge/>` - prevent the affection of a global css - "box-sizing" [#5920](https://github.com/wix/wix-style-react/pull/5920)
- `<PopoverMenu/>` - fix type definition [#5922](https://github.com/wix/wix-style-react/pull/5922)
- `<CustomModalLayout/>` - fix the cutting overflow content bug [#5932](https://github.com/wix/wix-style-react/pull/5932)

### Docs
- `<Timeline/>`, `<ToggleButton/>`, `<CheckToggle/>`- Testkits descriptions and implementation improvement [#5906](https://github.com/wix/wix-style-react/pull/5906)

## 9.7.0 - 2020-09-02
### Breaking
- `<Input/>` - Deprecated testkit functions: `clickSuffix`, `hasPrefixClass`, `hasSuffixClass`, `hasSuffixesClass` `isMenuArrowLast` [#5657](https://github.com/wix/wix-style-react/pull/5657)

## 9.6.0 - 2020-09-01
### Added
- `<CustomModalLayout/>` and `<BaseModalLayout/>` - add legacy drivers [#5907](https://github.com/wix/wix-style-react/pull/5907)
- `<FloatingNotification/>` - add fullWidth prop [#5910](https://github.com/wix/wix-style-react/pull/5910)

### Changed
- `<FilePicker/>` - implement using <FileUpload/> [#5820](https://github.com/wix/wix-style-react/pull/5820)

### Fixed
- `<Notification/>` - fix ellipsis tooltip positioning [#5900](https://github.com/wix/wix-style-react/pull/5900)

### Breaking
- `<FilePicker/>` - [testkit] - remove `getInput` function

## 9.5.0 - 2020-08-31
### Added
- `<Thumbnail/>` - add contentAlignment prop [#5860](https://github.com/wix/wix-style-react/pull/5860)
- `<RichTextInputArea/>` - add spellCheck prop [#5887](https://github.com/wix/wix-style-react/pull/5887)
- `<InputArea/>` - add the `required` attribute [#5898](https://github.com/wix/wix-style-react/pull/5898)
- `<PreviewWidget/>`- adding option for scrollable content [#5897](https://github.com/wix/wix-style-react/pull/5897)

### Changed
- `<NumberInput/>` - Disable up/down ticker on strict [#5892](https://github.com/wix/wix-style-react/pull/5892)

### Fixed
- `<StarsRatingBar/>` - [testkit] fix getSelectedRating [#5905](https://github.com/wix/wix-style-react/pull/5905)

## 9.4.0 - 2020-08-27
### Added
- `<Timeline/>` - allow passing a node instead of string only in the item label [#5883](https://github.com/wix/wix-style-react/pull/5883)
- `<FeatureList/>` - new component [#5752](https://github.com/wix/wix-style-react/pull/5752)
- `<MarketingPageLayoutContent/>` - new component [#5838](https://github.com/wix/wix-style-react/pull/5838)
- `<RichTextInputArea />` - add minHeight prop [#5869](https://github.com/wix/wix-style-react/pull/5869)

### Fixed
- `<Collapse/>` - fix the animation bug [#5882](https://github.com/wix/wix-style-react/pull/5882)
- `<DropdownLayout/>` - fix the RTL css issue & update visual tests [#5881](https://github.com/wix/wix-style-react/pull/5881)
- `<Table/>`- fix `isDisplayingNothing` implementation in driver & unidriver [#5878](https://github.com/wix/wix-style-react/pull/5878)
- `<DropdownLayout/>` - (testkit) fix click outside [#5894](https://github.com/wix/wix-style-react/pull/5894)

## 9.3.0 - 2020-08-24

### Added
- `<AnnouncementModalLayout/>` - added help button [#5852](https://github.com/wix/wix-style-react/pull/5852)
- `<CustomModalLayout/>` - added help button [#5849](https://github.com/wix/wix-style-react/pull/5849)
- `<MessageModalLayout/>` - added help button [#5853](https://github.com/wix/wix-style-react/pull/5853)

### Changed
- `<AddItem/>` - change background color of disabled state for theme `plain` [#5866](https://github.com/wix/wix-style-react/pull/5866)
- `<MultiSelectCheckbox/>`- using builders instead of manually using `<ListItemSelect/>` and `<ListItemSection/>` [#5823](https://github.com/wix/wix-style-react/pull/5823)

## 9.2.0 - 2020-08-19

### Added
- `<TestimonialList/>` - new component [#5782](https://github.com/wix/wix-style-react/pull/5782)

### Changed
- `<Sidebar/>` - update divider color [#5858](https://github.com/wix/wix-style-react/pull/5858)

### Fixed
- `<ListItemSection/>` - fix title and subheader colors [#5841](https://github.com/wix/wix-style-react/pull/5841)
- `<VariableInput/>` - fix wrong display when there is "{" before a variable [#5808](https://github.com/wix/wix-style-react/pull/5808)

### Docs
- `Cheatsheet` - create internal components family [#5850](https://github.com/wix/wix-style-react/pull/5850)
- `<TableToolbar/>`- fixing story page of `TableToolbar`[#5789](https://github.com/wix/wix-style-react/pull/5789)

## 9.1.0 - 2020-08-18

### Added
- `<TableListItem/>` - new component [#5788](https://github.com/wix/wix-style-react/pull/5788)
- `<Input/>` - add test to getDisabled [#5842](https://github.com/wix/wix-style-react/pull/5842)

### Fixed
- `<FileUpload/>` - fix story page [#5833](https://github.com/wix/wix-style-react/pull/5833)
- `<VariableInput/>` - Add public methods to its d.ts [#5847](https://github.com/wix/wix-style-react/pull/5847)
- `<Heading/>` - fix madefor [#5854](https://github.com/wix/wix-style-react/pull/5854)

### Changed
- `<MultiSelectCheckbox/>` - fix `listItemSectionBuilder` from displaying capital letters [#5822](https://github.com/wix/wix-style-react/pull/5822)

## 9.0.0 - 2020-08-12

Upgrade Stylable version to 3
