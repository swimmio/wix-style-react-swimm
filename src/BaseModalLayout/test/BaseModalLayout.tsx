import * as React from 'react';
import BaseModalLayout from '..';

function baseModalLayoutWithMandatoryProps() {
  return <BaseModalLayout />;
}

function baseModalLayoutWithAllProps() {
  return (
    <BaseModalLayout
      className={'cls'}
      dataHook={'BML-dh'}
      onCloseButtonClick={() => {}}
      onHelpButtonClick={() => {}}
      theme={'standard'}
    >
      <BaseModalLayout.Illustration
        className={'cls-illustration'}
        dataHook={'dh-illustration'}
        illustration={'illustration-src'}
      />
      <BaseModalLayout.Header
        className={'cls-header'}
        dataHook={'dh-header'}
        showHeaderDivider={false}
        title={'title-header'}
        subtitle={'subtitle-header'}
        titleAppearance={'H2'}
      />
      <BaseModalLayout.Content
        className={'cls-content'}
        dataHook={'fh-content'}
        content={'content'}
        contentHideDividers={false}
        scrollProps={{
          onScrollChanged: () => {},
          onScrollAreaChanged: () => {},
        }}
        overflow="visible"
      />
      <BaseModalLayout.Footer
        className={'cls-footer'}
        dataHook={'dh-footer'}
        primaryButtonText={'pb-text'}
        primaryButtonProps={{}}
        primaryButtonOnClick={() => {}}
        secondaryButtonText={'sb-text'}
        secondaryButtonProps={{}}
        secondaryButtonOnClick={() => {}}
        actionsSize={'large'}
        sideActions={<div />}
        showFooterDivider={false}
        theme={'standard'}
      />
      <BaseModalLayout.Footnote
        className={'cls-footnote'}
        dataHook={'dh-footnote'}
        footnote={<div />}
      />
    </BaseModalLayout>
  );
}
