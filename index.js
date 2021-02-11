try {
  const bucket = {
    settings: {},
    events: [],

    init: function (obj) {
      const self = this;
      if (!obj.appId) this.error("invalid app id");
      this.settings.appId = obj.appId;

      // override settings?
      this.settings.dispatchHost =
        obj.dispatchHost || "https://ingest.bucket.so";
      this.settings.dispatchUrl =
        this.settings.dispatchHost + "/" + this.settings.appId;
      this.settings.dispatchInterval = obj.dispatchUrl || 10000;
      this.settings.debug = obj.debug || false;

      // start dispatcher
      setInterval(function () {
        self.dispatcher();
      }, this.settings.dispatchInterval);

      if (this.settings.debug) console.log("bucket: initialized");
    },

    user: function (userId, obj) {
      try {
        this.settings.userId = userId; // important, to be used for company and events
        fetch(this.settings.dispatchUrl + "/user", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            attributes: obj,
          }),
        });
      } catch (err) {
        this.error(err);
      }
    },

    company: function (companyId, obj) {
      try {
        fetch(this.settings.dispatchUrl + "/company", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyId: companyId,
            userId: this.settings.userId,
            attributes: obj,
          }),
        });
      } catch (err) {
        this.error(err);
      }
    },

    event: function (event, obj) {
      try {
        this.events.push({
          event: event,
          userId: this.settings.userId,
          attributes: obj,
        });
      } catch (err) {
        this.error(err);
      }
    },

    dispatcher: function () {
      try {
        const arrLength = this.events.length;
        if (!arrLength > 0) return null;
        if (this.settings.debug) console.log("bucket: dispatching events ");
        // loop start
        for (let i = 0; i < this.events.length; i++) {
          // send
          const eventObj = this.events[i];
          fetch(this.settings.dispatchUrl + "/event", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(eventObj),
          });
        }
        // loop done, remove the events
        this.events.splice(0, arrLength);
      } catch (err) {
        this.error(err);
      }
    },

    error: function (msg) {
      console.log(`bucket error: ${msg}`);
    },
  };

  if (window && !window.bucket) window.bucket = bucket;
  //
} catch (err) {
  console.log("bucket error", err);
}
