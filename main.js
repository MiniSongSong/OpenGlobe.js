require.config({
	paths:{
		jquery : './thirdparty/jquery-1.11.0'
	},

	baseUrl:'Source'
});

require(
[
    'jquery',
    'Core/Vector3D',
    'Core/Geodetic2D',
    'Core/Geodetic3D',
    'Core/Ellipsoid',
    'Core/PrimitiveType',
    'Renderer/Camera',
    'Renderer/Color',
    'Renderer/BufferHint',
    'Renderer/RenderState',
    'Renderer/SceneState',
    'Renderer/ClearState',
    'Renderer/Device',
    'Renderer/Mesh',
    'Renderer/VertexAttribute',
    'Renderer/Indices',
    'Renderer/DrawState',
    'Renderer/Input/Mouse'
],
function
(
    $,
    Vector3D,
    Geodetic2D,
    Geodetic3D,
    Ellipsoid,
    PrimitiveType,
    Camera,
    Color,
    BufferHint,
    RenderState,
    SceneState,
    ClearState,
    Device,
    Mesh,
    VertexAttribute,
    Indices,
    DrawState,
    Mouse
)
{
    var Triangle = function(){
        this._flag = false;
        this._name = 'test Trianlge';
        this._device = new Device("canvas");
        this._window = this._device.CreateWindow(680,680,'tttt');
        var shaderProgram = this._device.CreateProgramFromID("shader-vs","shader-fs");

        this._sceneState = new SceneState();
        this._clearState = new ClearState();
        this._clearState.Color = Color.FromRgba(0.0,0.0,0.0,1.0);

        //this._mouse = new Mouse(this._device._canvas);

        this._window.RenderFrameHandler = (function(that){
            var triangle = that;
            return function(){
                triangle.OnRenderFrame();
            };
        })(this);

        /////////////////////////////////////////////////

        var mesh = new Mesh();

        var positionAttribute = new VertexAttribute('aVertexPosition');
        //mesh.Attributes.push(positionAttribute);
        mesh.Attributes['aVertexPosition'] = positionAttribute;

        var indices = new Indices();
        mesh.Indices = indices;

        var positions = positionAttribute.Values;
        positions.push(new Vector3D(0,0,0));
        positions.push(new Vector3D(1,0,0));
        positions.push(new Vector3D(0,1,0));
        positions.push(new Vector3D(0,0,0));
        positions.push(new Vector3D(-1,0,0));
        positions.push(new Vector3D(0,-1,0));

        indices.AddTriangle(0,1,2);
        indices.AddTriangle(3,4,5);

        var va = this._window.Context.CreateVertexArray(mesh,shaderProgram.VertexAttributes,BufferHint.StaticDraw);

        var image = new Image();
        var texture = null;
        var that = this;
        image.onload = function(){
            texture = that._device.CreateTexture2D(image);
            that._window.Context.TextureUnits.GetTextureUnitByIndex(0).Texture = texture;
            that._flag = true;
        };
        image.src = 'Examples/img/crate.gif';

        /////////////////////////////////////////////////////

        var renderState = new RenderState();
        renderState.FacetCulling.Enabled = false;
        renderState.DepthTest.Enabled = false;

        this._drawState = new DrawState(this._renderState,shaderProgram,va);

        this._sceneState.Camera.zoomToTarget(1);
    };

    Triangle.prototype.OnRenderFrame = function(){
        var context = this._window.Context;

        context.Clear(this._clearState);


        if(this._flag){
            context.Draw(PrimitiveType.Triangles,this._drawState,this._sceneState);
        }
        console.log(this._name);
    };


    Triangle.prototype.Run = function(updateRate){
        this._window.Run(updateRate);
    };




    var example = new Triangle();

    example.Run(60);


    

    console.log('ok.');
});