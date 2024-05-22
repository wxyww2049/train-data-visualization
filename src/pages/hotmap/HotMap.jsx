import React, { useEffect } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
export default function HotMap() {
  let map = null;
  useEffect(() => {
    AMapLoader.load({
      key: "8dfd21dace9b350f22f599e041295b68", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.Scale"],
      Loca: {
        // 是否加载 Loca， 缺省不加载
        version: "2.0.0", // Loca 版本，缺省 1.3.2
      },
    })
      .then((AMap) => {
        var map = new AMap.Map("map", {
          zooms: [4, 7],
          zoom: 4.8,
          center: [118.618687, 31.790976],
          showLabel: false,
          viewMode: "3D",
          mapStyle: "amap://styles/dark",
          pitch: 40,
        });

        var loca = new Loca.Container({
          map,
        });

        var geo = new Loca.GeoJSONSource({
          url: "/hot_city.json",
          // url: "https://a.amap.com/Loca/static/loca-v2/demos/mock_data/traffic.json",
        });

        var heatmap = new Loca.HeatMapLayer({
          // loca,
          zIndex: 10,
          opacity: 1,
          visible: true,
          zooms: [2, 22],
        });

        heatmap.setSource(geo, {
          radius: 200000,
          unit: "meter",
          height: 500000,
          //radius: 35,
          //unit: 'px',
          //height: 100,
          gradient: {
            0.1: "#2A85B8",
            0.2: "#16B0A9",
            0.3: "#29CF6F",
            0.4: "#5CE182",
            0.5: "#7DF675",
            0.6: "#FFF100",
            0.7: "#FAA53F",
            1: "#D04343",
          },
          value: function (index, feature) {
            return feature.properties.avg;
          },
          // min: -100,
          // max: 100,
          heightBezier: [0, 0.53, 0.37, 0.98],
        });
        loca.add(heatmap);

        map.on("complete", function () {
          heatmap.addAnimate({
            key: "height",
            value: [0, 1],
            duration: 2000,
            easing: "BackOut",
            // yoyo: true,
            // repeat: 2,
          });
          heatmap.addAnimate({
            key: "radius",
            value: [0, 1],
            duration: 2000,
            easing: "BackOut",
            // 开启随机动画
            transform: 1000,
            random: true,
            delay: 5000,
          });
        });
        map.on("click", function (e) {
          var feat = heatmap.queryFeature(e.pixel.toArray());
          if (feat) {
            map.clearMap();
            map.add(
              new AMap.Marker({
                position: feat.lnglat,
                anchor: "bottom-center",
                content:
                  '<div style="margin-bottom: 15px; border:1px solid #fff; border-radius: 4px;color: #fff; width: 150px; text-align: center;">热力值: ' +
                  feat.value.toFixed(2) +
                  "</div>",
              })
            );
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
    return () => {
      map?.destroy();
    };
  }, []);

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "100px",
          left: "300px",
          zIndex: 1,
        }}
      >
        <h1 style={{ color: " rgb(180, 180, 190)" }}>全国火车站热力图</h1>
      </div>
      <div id="map" style={{ height: "800px", width: "100%" }}></div>
    </div>
  );
}
