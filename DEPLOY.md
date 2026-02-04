# GitHub Pages Deploy Checklist

This file documents the steps to finalize the GitHub Pages publishing source.

1. Verify the `gh-pages` branch exists (the deploy workflow creates it on first run).
   - `git branch -a` or check the branch list on GitHub.
2. Change the Pages source using the GitHub UI (requires repo admin):
   - Go to: Settings → Code and automation → Pages (or Settings → Pages)
   - Under **Build and deployment** / **Source**, set:
     - **Branch**: `gh-pages`
     - **Folder**: `/ (root)`
   - Click **Save** and wait for the page to show the published URL.
3. Ensure **Enforce HTTPS** is enabled in the Pages settings.

If you'd like, I can open a PR adding this file and the badge (already added to README). If you want me to set the Pages source with the API I will need a short-lived token with repo admin permissions (or you can run the curl command below locally and then revoke the token):

```
curl -X PUT -H "Accept: application/vnd.github+json" -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/<OWNER>/<REPO>/pages \
  -d '{"source":{"branch":"gh-pages","path":"/"}}'
```

Once the source is set to `gh-pages`, future pushes to `main` will automatically update the site via the workflow and the `gh-pages` branch will be kept in sync.
