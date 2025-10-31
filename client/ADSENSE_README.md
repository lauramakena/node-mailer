# Frontend AdSense Configuration

## Environment Variables Setup

Create a `.env` file in this client directory with your AdSense configuration:

```bash
# Google AdSense Configuration
REACT_APP_ADSENSE_PUBLISHER_ID=ca-pub-YOUR_PUBLISHER_ID
REACT_APP_ADSENSE_HEADER_SLOT=YOUR_HEADER_AD_SLOT_ID
REACT_APP_ADSENSE_SIDEBAR_SLOT=YOUR_SIDEBAR_AD_SLOT_ID
REACT_APP_ADSENSE_FOOTER_SLOT=YOUR_FOOTER_AD_SLOT_ID
```

## Getting Your AdSense IDs

1. **Publisher ID**: Found in your AdSense dashboard (starts with `ca-pub-`)
2. **Ad Slot IDs**: Create ad units in AdSense and note their slot IDs

## Ad Placements

Your app includes these ad placements:
- **Header Banner**: Top of the page
- **Sidebar Ad**: Right sidebar (sticky)
- **Footer Banner**: Bottom of the page

## Next Steps

1. Replace placeholder values with your actual AdSense IDs
2. Test locally with `npm start`
3. Deploy to production
4. Submit site for AdSense approval if needed

See the main `ADSENSE_SETUP.md` file in the project root for detailed instructions.
