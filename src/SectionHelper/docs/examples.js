export const structure = `
<SectionHelper
  actionText="Action Button"
  appearance="standard"
  onAction={() => 'onAction'}
  onClose={() => 'onClose'}
  title="This is a Section Helper Title"
>
  This is a description explaining why you're seeing this message
</SectionHelper>
`;

export const appearance = `
<React.Fragment>

<SectionHelper
  actionText="Setup Payments"
  appearance="standard"
  onAction={() => 'onAction'}
  onClose={() => 'onClose'}
  title="Don't forget to setup payments"
>
  In order to sell your music you need to choose a payment method.
</SectionHelper>
<br/>
<SectionHelper
  actionText="Set Up a Privacy Policy"
  appearance="warning"
  onAction={() => 'onAction'}
  onClose={() => 'onClose'}
  title="Missing Privacy Policy"
>
  All websites are required to provide a link to comprehensive privacy policy.
</SectionHelper>
<br/>
<SectionHelper
  actionText="Open Settings"
  appearance="danger"
  onAction={() => 'onAction'}
  onClose={() => 'onClose'}
  title="Your data got corrupted!"
>
  Go to settings and update your contact details in order to let your clients reach you.
</SectionHelper>
<br/>
<SectionHelper
  actionText="Open SEO Tools"
  appearance="success"
  onAction={() => 'onAction'}
  onClose={() => 'onClose'}
  title="Your SEO is good"
>
  Congratulations, your website appears at the top of the list in search results.
</SectionHelper>
<br/>
<SectionHelper
  actionText="Upgrade Now"
  appearance="premium"
  onAction={() => 'onAction'}
  onClose={() => 'onClose'}
  title="Upgrade to a Premium Plan"
>
  To start accepting payments for your plans, upgrade your site with a Business & eCommmerce Premium Plan.
</SectionHelper>
<br/>
<SectionHelper
  actionText="Manage Subscriptions"
  appearance="preview"
  onAction={() => 'onAction'}
  onClose={() => 'onClose'}
  title="Total $9.99"
>
  Your yearly subscription will auto renew on January 1st, 2021.
</SectionHelper>
<br/>
<SectionHelper
  actionText="Manage Subscriptions"
  appearance="experimentalDark"
  onAction={() => 'onAction'}
  onClose={() => 'onClose'}
  title="Total $9.99"
>
  Your yearly subscription will auto renew on January 1st, 2021.
</SectionHelper>
</React.Fragment>
`;

export const title = `
<React.Fragment>
<SectionHelper
  appearance="standard"
  title="Don't forget to setup payments"
>
  In order to sell your music you need to choose a payment method.
</SectionHelper>
<br/>
<SectionHelper
  appearance="standard"
>
  Ir order to sell your music you need to choose a payment method.
</SectionHelper>
</React.Fragment>
`;

export const close = `
<SectionHelper
  appearance="standard"
  title="Don't forget to setup payments"
  onClose={() => 'onClose'}
>
  In order to sell your music you need to choose a payment method.
</SectionHelper>
`;

export const children = `
<SectionHelper appearance="standard">
  In order to sell your music you need to choose a payment method.
  <Box inline>
    <TextButton size="small">Setup Payments</TextButton>
  </Box>
</SectionHelper>;
`;

export const action = `
<SectionHelper
  actionText="Setup Payments"
  appearance="standard"
  onAction={() => 'onAction'}
  title="Don't forget to setup payments"
>
  In order to sell your music you need to choose a payment method.
</SectionHelper>
`;

export const componentWidth = `
<React.Fragment>
  <Box width="100%">
    <SectionHelper appearance="standard">
      In order to sell your music you need to choose a payment method.
    </SectionHelper>
  </Box>
  <br />
  <Box width="80%">
    <SectionHelper appearance="standard">
      In order to sell your music you need to choose a payment method.
    </SectionHelper>
  </Box>
    <br />
  <Box width="40%">
    <SectionHelper appearance="standard">
      In order to sell your music you need to choose a payment method.
    </SectionHelper>
  </Box>
</React.Fragment>
`;

export const contentWidth = `
<React.Fragment>
  <SectionHelper appearance="standard">
    Release Manager allows you to publish a version of your site to a percentage
    of your site visitors. This is a great way to test new features on your site
    or get feedback on changes you have made before publishing to 100% of
    visitors.
  </SectionHelper>
  <br />
  <SectionHelper appearance="standard" fullWidth>
    Release Manager allows you to publish a version of your site to a percentage
    of your site visitors. This is a great way to test new features on your site
    or get feedback on changes you have made before publishing to 100% of
    visitors.
  </SectionHelper>
</React.Fragment>
`;

export const cardExample = `
<Card>
  <Card.Header title="Use in a Card" />
  <Card.Divider />
  <Card.Content>
    <SectionHelper appearance="standard" title="Don't forget to setup payments">
      In order to sell your music you need to choose a payment method.
    </SectionHelper>
  </Card.Content>
</Card>
`;

export const pageExample = `
<Page>
  <Page.Header title="Page Header" />
  <Page.Content>
    <Container>
      <Row>
        <Col span={12}>
          <SectionHelper
            appearance="standard"
            title="Don't forget to setup payments"
          >
            In order to sell your music you need to choose a payment method.
          </SectionHelper>
        </Col>
      </Row>
      <Row stretchViewsVertically>
        <Col span={8}>
          <Card>
            <Card.Header title="Card" />
            <Card.Divider />
            <Card.Content>
              <Box height="200px" />
            </Card.Content>
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Card.Header title="Card" />
            <Card.Divider />
            <Card.Content>
              <Box height="200px" />
            </Card.Content>
          </Card>
        </Col>
      </Row>
    </Container>
  </Page.Content>
</Page>
`;
