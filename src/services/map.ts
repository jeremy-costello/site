import {
  Viewer
} from "@cesium/widgets";
import {
  Moon,
  Sun,
  Color,
  createWorldTerrainAsync
} from "@cesium/engine";

export async function getCesiumViewer(container: HTMLDivElement): Promise<Viewer> {   
  const viewer = new Viewer(container, {
    timeline: false,
    animation: false,
    homeButton: true,
    sceneModePicker: false,
    baseLayerPicker: true,
    navigationHelpButton: true,
    fullscreenButton: false,
    vrButton: false,
    geocoder: true,
    infoBox: true,
    selectionIndicator: true
  });

  viewer.scene.moon = new Moon();
  viewer.scene.sun = new Sun();

  viewer.scene.requestRenderMode = true;
  viewer.scene.maximumRenderTimeChange = Infinity;

  viewer.resolutionScale = 0.5;
  viewer.scene.skyBox.show = false;
  viewer.scene.skyAtmosphere.show = false;
  viewer.scene.sun.show = false;
  viewer.scene.moon.show = false;
  viewer.scene.fog.enabled = true;
  viewer.scene.fog.renderable = false;
  viewer.scene.fog.density = 1.2e-3;
  viewer.scene.fog.screenSpaceErrorFactor = 4.0;
  viewer.scene.globe.maximumScreenSpaceError = 8;
  viewer.scene.globe.enableLighting = false;
  viewer.scene.globe.showGroundAtmosphere = false;
  viewer.scene.globe.showSkirts = true;
  viewer.scene.globe.showWaterEffect = false;
  viewer.scene.shadowMap.enabled = false;
  viewer.scene.postProcessStages.fxaa.enabled = true;
  viewer.scene.postProcessStages.ambientOcclusion.enabled = false;
  viewer.scene.postProcessStages.bloom.enabled = false;
  viewer.scene.msaaSamples = 1;
  viewer.scene.backgroundColor = Color.SKYBLUE.clone();
  viewer.scene.requestRender();

  // Set terrain provider after viewer creation
  const terrainProvider = await createWorldTerrainAsync();
  viewer.terrainProvider = terrainProvider;

  return viewer;
}