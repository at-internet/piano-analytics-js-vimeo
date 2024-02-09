# Vimeo - Piano Analytics plugin

The `Vimeo` plugin enables you to track Vimeo videos on your website with the Piano Analytics SDK. The plugin makes the tracking as simple as possible, while keeping all the flexibility of the AV Insights module.

By installing the JS library on your website and following the documentation below, you will be able to fully track Vimeo videos. The plugin will automatically send contextual and technical events according to the media information provided.

It also includes a function enabling you to add your own properties to the events.

## Table of content

- Get started
- Install the plugin
- Reference our functions in the Vimeo code
- Add properties to your events
- Complete tagging example

## Getting Started

- Load the `vimeo-pa-connector.js` plugin in your project after the `piano-analytics.js` and Vimeo player libraries.
- Read the documentation for an overview of the functionalities and examples.
- Collect AV Insights events from your Vimeo videos.

## Install the plugin

Download the `vimeo-pa-connector.js` directly from [this repo](vimeo-pa-connector.js) and install it along with the `piano-analytics.js` library.

```html
<script src="piano-analytics.js"></script>
<script type="text/javascript">
  pa.setConfigurations({
    // Basic configuration to send events
    site: 123456789,
    collectDomain: "https://xxxxx.pa-cd.com",
  });
</script>
<script src="https://player.vimeo.com/api/player.js"></script>
<script src="vimeo-pa-connector.js"></script>
```

## Reference our functions in the Vimeo code

Vimeo provides the following code to embed its video player on an HTML page (doc: [Vimeo GitHub documentation](https://github.com/vimeo/player.js?tab=readme-ov-file#pre-existing-player))

```html
<iframe src="https://player.vimeo.com/video/76979871?h=8272103f6e" width="640" height="360" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>

<script src="https://player.vimeo.com/api/player.js"></script>
<script>
  const iframe = document.querySelector('iframe');
  const player = new Vimeo.Player(iframe);

  player.on('play', function() {
    console.log('played the video!');
  });

  player.getVideoTitle().then(function(title) {
    console.log('title:', title);
  });
</script>
```

The iframe corresponds to the embedded video player. By calling `querySelector('iframe')` the code will find the first iframe on the page. If there are multiple iframes on the page, it is best to assign them a unique ID. You can also create the player dynamically in JS (please refer to Vimeo documentation). This will not change how the plugin works.

We then create a variable `player` that references the iframe or player available on the page, to listen to the `ready` event of that player.

It is in the callback of that `ready` method that our methods will be referenced:

```html
<iframe src="https://player.vimeo.com/video/76979871?h=8272103f6e" width="640" height="360" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>

<script src="https://player.vimeo.com/api/player.js"></script>
<script src="vimeo-pa-connector.js"></script>
<script>
  const iframe = document.querySelector('iframe');
  const player = new Vimeo.Player(iframe);

  player.on('play', function() {
    console.log('played the video!');
  });

  player.getVideoTitle().then(function(title) {
    console.log('title:', title);
  });

  player.ready().then(function () {
    paVimeoConnector.media = new pa.avInsights.Media(5, 5);
    paVimeoConnector.onPlayerReady(player);
    paVimeoConnector.params = {
      'av_custom_property': 'Custom value'
    };
  });
</script>
```

## Add properties to your events

The plugin supports the following events:

`av.play` / `av.start` / `av.heartbeat` / `av.pause` / `av.resume` / `av.stop ` / `av.seek.start` / `av.forward` / `av.backward`

The following properties are automatically set by the plugin.

| Property key         | Type    | Mandatory | Description                                              | Source                           |
| -------------------- | ------- | --------- | -------------------------------------------------------- | -------------------------------- |
| av_content_id        | string  | yes       | Audio/Video content identifier                           | `data.id.toString()` |
| av_content           | string  | -         | Title of the Audio/Video content                         | `instanciatedPlayer.getVideoTitle()`    |
| av_content_duration  | integer | -         | Total duration of the Audio/Video content (milliseconds) | `data.duration*1000`           |

You can set additional properties using the `paVimeoConnector.params` method:

Method: `paVimeoConnector.params = <propertiesObject>`

| Property key       | Type   | Mandatory                                  |
| ------------------ | ------ | ------------------------------------------ |
| `propertiesObject` | object | Pairs of `propertyKey` and `propertyValue` |

```html
<script>
  paVimeoConnector.media = new pa.avInsights.Media(5, 5);
  paVimeoConnector.params = {
    av_content_type: "TV show",
    av_content_genre: ["Crime", "Drama", "Mystery"],
    av_show: "Dark",
    av_publication_date: 15010656730
  }
</script>
```

## Complete tagging example

```html
<html>
  <head>
    <title>My Page</title>
    <script src="piano-analytics.js"></script>
    <script type="text/javascript">
      pa.setConfigurations({
        // Basic configuration to send events
        site: 123456789,
        collectDomain: "https://logsx.xiti.com",
      });
    </script>
    <script src="https://player.vimeo.com/api/player.js"></script>
    <script src="vimeo-pa-connector.js"></script>
  </head>
  <body>
    <iframe src="https://player.vimeo.com/video/76979871?h=8272103f6e" width="640" height="360" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>
    <script>
      const iframe = document.querySelector('iframe');
      const player = new Vimeo.Player(iframe);

      player.on('play', function() {
        console.log('played the video!');
      });

      player.getVideoTitle().then(function(title) {
        console.log('title:', title);
      });

      player.ready().then(function () {
        paVimeoConnector.media = new pa.avInsights.Media(5, 5);
        paVimeoConnector.onPlayerReady(player);
        paVimeoConnector.params = {
          'av_custom_property': 'Custom value'
        };
      });
    </script>
  </body>
</html>
```
