## MVP Definition

- **Core promise:** Passive, scheduled location sharing from an Android phone to paired receivers (Android TV, Google Assistant) with ETA summaries.
- **User stories:**
  1. Sharer schedules automatic updates every 30 minutes during commuting hours.
  2. Receiver opens TV app to see map, last update, ETA home.
  3. Receiver asks smart speaker “Where is Alex?” and hears location + ETA.
  4. Sharer pauses sharing instantly from mobile app.

## Implementation Phases

| Phase | Duration | Goals |
| --- | --- | --- |
| Discovery Sprint | 2 weeks | Interview users, validate problem, finalize MVP scope, marketing landing page. |
| Prototype | 3 weeks | Android phone app with manual share, backend ingest, basic TV emulator; closed beta list building. |
| MVP Build | 6 weeks | Scheduled updates, Google Maps ETA integration, WebSocket push, minimal TV app, Google Assistant action beta. |
| Beta & Iterate | 3 weeks | Instrument analytics, polish UX, onboarding, in-app paywall hooks, fix feedback. |
| Launch | 2 weeks | App Store release, marketing campaigns, referral system. |

**Total MVP timeframe:** ~16 weeks from discovery to public launch.

## Technical Milestones

- Set up cloud infrastructure (auth, database, messaging) with IaC templates.
- Implement secure pairing flow (code exchange) between sharer and receivers.
- Deliver Android app with battery-optimized background location and scheduling.
- Build real-time location service + caching + ETA calculations.
- Release Android TV app and Google Assistant action with shared UI components.
- Integrate analytics (Mixpanel/Amplitude) and subscription billing (Play Billing 5.0).

## Post-MVP Enhancements

- Geofence-based alerts, extended history, Amazon Alexa skill, iOS sharer app, caregiver dashboard, enterprise admin portal.
