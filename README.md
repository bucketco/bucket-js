# Archived

This project has been superseded by [the bucket tracking SDK](https://github.com/bucketco/bucket-tracking-sdk).

---

## Bucket.js

Bucket JS agent to interact with the [Bucket HTTP Tracking API](https://bucket.so/docs/bucket-api)

### Quick start

Include the script

`<script src="https://cdn.jsdelivr.net/gh/bucketdotso/bucket-js@v.0.2/index.js"></script>`

Initialize the agent

```javascript
window.bucket.init({
  appId: "5349da0e-82ed-4233-8e53-4b9d139ff461",
});
```

Identify the user

```javascript
window.bucket.user("<user id>", {
  custom: "attribute",
});
```

Identify the company. The user will be associated with it

```javascript
window.bucket.company("<company id>", {
  monthly_spend: 99,
});
```

Track user interactions

```javascript
window.bucket.event("<event id string>");
```

### Privacy

The agent **does not** collect any additional metadata about your users - only what you explicitly send is stored.
