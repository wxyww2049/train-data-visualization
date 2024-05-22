import React, { useEffect } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
export default function FlowMap() {
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
        map = new AMap.Map("map", {
          zoom: 5.1,
          // showLabel: false,
          viewMode: "3D",
          pitch: 48,
          center: [114.780269, 32.955403],
          mapStyle: "amap://styles/dark",
          // defaultCursor: "none",
          plugins: ["AMap.Scale"],
        });
        var loca = new Loca.Container({
          map,
        });
        var scatter = new Loca.ScatterLayer({
          loca,
          zIndex: 10,
          opacity: 0.6,
          // visible: true,
          zooms: [2, 22],
        });

        var pointGeo = new Loca.GeoJSONSource({
          url: "https://a.amap.com/Loca/static/loca-v2/demos/mock_data/pulselink-china-city-point.json",
        });
        scatter.setSource(pointGeo);
        scatter.setStyle({
          unit: "meter",
          size: [100000, 100000],
          borderWidth: 0,
          texture:
            "https://a.amap.com/Loca/static/loca-v2/demos/images/breath_red.png",
          duration: 2000,
          animate: true,
        });
        loca.add(scatter);

        // 弧线
        var pulseLink = new Loca.PulseLinkLayer({
          // loca,
          zIndex: 10,
          opacity: 1,
          visible: true,
          zooms: [2, 22],
          depth: true,
        });

        var geo = new Loca.GeoJSONSource({
          url: "/flow_map_data.json",
        });

        pulseLink.setSource(geo);
        pulseLink.setStyle({
          unit: "meter",
          dash: [40000, 0, 40000, 0],
          lineWidth: function () {
            return [20000, 1000];
          },
          height: function (index, feat) {
            return feat.distance / 3 + 10;
          },
          // altitude: 1000,
          smoothSteps: 30,
          speed: function (index, prop) {
            return 1000 + Math.random() * 200000;
          },
          flowLength: 100000,
          lineColors: function (index, feat) {
            return [
              "rgb(255,228,105)",
              "rgb(255,164,105)",
              "rgba(1, 34, 249,1)",
            ];
          },
          maxHeightScale: 0.3, // 弧顶位置比例
          headColor: "rgba(255, 255, 0, 1)",
          trailColor: "rgba(255, 255,0,0)",
        });
        loca.add(pulseLink);
        loca.animate.start();
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
        <h1 style={{ color: " rgb(180, 180, 190)" }}>列车走向</h1>
      </div>
      <div id="map" style={{ height: "800px", width: "100%" }}></div>
    </div>
  );
}
