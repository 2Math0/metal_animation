{
  "sksl": {
    "entrypoint": "liquid_fragment_main",
    "shader": "// This SkSL shader is autogenerated by spirv-cross.\n\nfloat4 flutter_FragCoord;\n\nuniform vec2 uSize;\nuniform float u_time;\nuniform float u_ratio;\nuniform float u_img_ratio;\nuniform float u_patternScale;\nuniform float u_refraction;\nuniform float u_edge;\nuniform float u_patternBlur;\nuniform float u_liquid;\nuniform shader u_image_texture;\nuniform half2 u_image_texture_size;\n\nvec4 fragColor;\n\nvec2 FLT_flutter_local_FlutterFragCoord()\n{\n    return flutter_FragCoord.xy;\n}\n\nvec2 FLT_flutter_local_get_img_uv(vec2 uv)\n{\n    vec2 img_uv = uv;\n    img_uv -= vec2(0.5);\n    if (u_ratio > u_img_ratio)\n    {\n        img_uv.x = (img_uv.x * u_ratio) / u_img_ratio;\n    }\n    else\n    {\n        img_uv.y = (img_uv.y * u_img_ratio) / u_ratio;\n    }\n    float scale_factor = 1.0;\n    img_uv *= scale_factor;\n    img_uv += vec2(0.5);\n    img_uv.y = 1.0 - img_uv.y;\n    return img_uv;\n}\n\nvec2 FLT_flutter_local_rotate(vec2 uv, float th)\n{\n    return mat2(vec2(cos(th), sin(th)), vec2(-sin(th), cos(th))) * uv;\n}\n\nfloat FLT_flutter_local_get_img_frame_alpha(vec2 uv, float img_frame_width)\n{\n    float img_frame_alpha = smoothstep(0.0, img_frame_width, uv.x) * smoothstep(1.0, 1.0 - img_frame_width, uv.x);\n    img_frame_alpha *= (smoothstep(0.0, img_frame_width, uv.y) * smoothstep(1.0, 1.0 - img_frame_width, uv.y));\n    return img_frame_alpha;\n}\n\nvec2 FLT_flutter_local_mod289(vec2 x)\n{\n    return x - (floor(x * 0.00346020772121846675872802734375) * 289.0);\n}\n\nvec3 FLT_flutter_local_mod289(vec3 x)\n{\n    return x - (floor(x * 0.00346020772121846675872802734375) * 289.0);\n}\n\nvec3 FLT_flutter_local_permute(vec3 x)\n{\n    vec3 param = ((x * 34.0) + vec3(1.0)) * x;\n    return FLT_flutter_local_mod289(param);\n}\n\nfloat FLT_flutter_local_snoise(vec2 v)\n{\n    vec2 i = floor(v + vec2(dot(v, vec2(0.3660254180431365966796875))));\n    vec2 x0 = (v - i) + vec2(dot(i, vec2(0.211324870586395263671875)));\n    bvec2 _124 = bvec2(x0.x > x0.y);\n    vec2 i1 = vec2(_124.x ? vec2(1.0, 0.0).x : vec2(0.0, 1.0).x, _124.y ? vec2(1.0, 0.0).y : vec2(0.0, 1.0).y);\n    vec4 x12 = x0.xyxy + vec4(0.211324870586395263671875, 0.211324870586395263671875, -0.57735025882720947265625, -0.57735025882720947265625);\n    vec4 _134 = x12;\n    vec2 _136 = _134.xy - i1;\n    x12.x = _136.x;\n    x12.y = _136.y;\n    vec2 param = i;\n    i = FLT_flutter_local_mod289(param);\n    vec3 param_1 = vec3(i.y) + vec3(0.0, i1.y, 1.0);\n    vec3 param_2 = (FLT_flutter_local_permute(param_1) + vec3(i.x)) + vec3(0.0, i1.x, 1.0);\n    vec3 p = FLT_flutter_local_permute(param_2);\n    vec3 m = max(vec3(0.5) - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), vec3(0.0));\n    m *= m;\n    m *= m;\n    vec3 x = (fract(p * vec3(0.024390242993831634521484375)) * 2.0) - vec3(1.0);\n    vec3 h = abs(x) - vec3(0.5);\n    vec3 ox = floor(x + vec3(0.5));\n    vec3 a0 = x - ox;\n    m *= (vec3(1.792842864990234375) - (((a0 * a0) + (h * h)) * 0.8537347316741943359375));\n    vec3 g;\n    g.x = (a0.x * x0.x) + (h.x * x0.y);\n    vec2 _251 = (a0.yz * x12.xz) + (h.yz * x12.yw);\n    g.y = _251.x;\n    g.z = _251.y;\n    return 130.0 * dot(m, g);\n}\n\nfloat FLT_flutter_local_get_color_channel(float c1, float c2, float stripe_p, vec3 w, float extra_blur, inout float b)\n{\n    float ch = c2;\n    float border = 0.0;\n    float blur = u_patternBlur + extra_blur;\n    ch = mix(ch, c1, smoothstep(0.0, blur, stripe_p));\n    border = w.x;\n    ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));\n    b = smoothstep(0.20000000298023223876953125, 0.800000011920928955078125, b);\n    border = w.x + ((0.4000000059604644775390625 * (1.0 - b)) * w.y);\n    ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));\n    border = w.x + ((0.5 * (1.0 - b)) * w.y);\n    ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));\n    border = w.x + w.y;\n    ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));\n    float gradient_t = ((stripe_p - w.x) - w.y) / w.z;\n    float gradient = mix(c1, c2, smoothstep(0.0, 1.0, gradient_t));\n    ch = mix(ch, gradient, smoothstep(border - blur, border + blur, stripe_p));\n    return ch;\n}\n\nvoid FLT_main()\n{\n    vec2 uv = FLT_flutter_local_FlutterFragCoord() / uSize;\n    uv.x *= u_ratio;\n    float diagonal = uv.x - uv.y;\n    float t = 0.001000000047497451305389404296875 * u_time;\n    vec2 param = vec2(uv.x, 1.0 - uv.y);\n    vec2 img_uv = FLT_flutter_local_get_img_uv(param);\n    vec4 img = u_image_texture.eval(u_image_texture_size * ( img_uv));\n    vec3 color = vec3(0.0);\n    float opacity = 1.0;\n    vec3 color1 = vec3(0.980000019073486328125, 0.980000019073486328125, 1.0);\n    vec3 color2 = vec3(0.100000001490116119384765625, 0.100000001490116119384765625, 0.100000001490116119384765625 + (0.100000001490116119384765625 * smoothstep(0.699999988079071044921875, 1.2999999523162841796875, uv.x + uv.y)));\n    float edge = img.x;\n    vec2 grad_uv = uv;\n    grad_uv -= vec2(0.5);\n    float dist = length(grad_uv + vec2(0.0, 0.20000000298023223876953125 * diagonal));\n    vec2 param_1 = grad_uv;\n    float param_2 = (0.25 - (0.20000000298023223876953125 * diagonal)) * 3.1415927410125732421875;\n    grad_uv = FLT_flutter_local_rotate(param_1, param_2);\n    float bulge = pow(1.7999999523162841796875 * dist, 1.2000000476837158203125);\n    bulge = 1.0 - bulge;\n    bulge *= pow(uv.y, 0.300000011920928955078125);\n    float cycle_width = u_patternScale;\n    float thin_strip_1_ratio = (0.119999997317790985107421875 / cycle_width) * (1.0 - (0.4000000059604644775390625 * bulge));\n    float thin_strip_2_ratio = (0.070000000298023223876953125 / cycle_width) * (1.0 + (0.4000000059604644775390625 * bulge));\n    float wide_strip_ratio = (1.0 - thin_strip_1_ratio) - thin_strip_2_ratio;\n    float thin_strip_1_width = cycle_width * thin_strip_1_ratio;\n    float thin_strip_2_width = cycle_width * thin_strip_2_ratio;\n    opacity = 1.0 - smoothstep(0.89999997615814208984375 - (0.5 * u_edge), 1.0 - (0.5 * u_edge), edge);\n    vec2 param_3 = img_uv;\n    float param_4 = 0.00999999977648258209228515625;\n    opacity *= FLT_flutter_local_get_img_frame_alpha(param_3, param_4);\n    vec2 param_5 = uv - vec2(t);\n    float noise = FLT_flutter_local_snoise(param_5);\n    edge += (((1.0 - edge) * u_liquid) * noise);\n    float refr = 0.0;\n    refr += (1.0 - bulge);\n    refr = clamp(refr, 0.0, 1.0);\n    float dir = grad_uv.x;\n    dir += diagonal;\n    dir -= (((2.0 * noise) * diagonal) * (smoothstep(0.0, 1.0, edge) * smoothstep(1.0, 0.0, edge)));\n    bulge *= clamp(pow(uv.y, 0.100000001490116119384765625), 0.300000011920928955078125, 1.0);\n    dir *= (0.100000001490116119384765625 + ((1.10000002384185791015625 - edge) * bulge));\n    dir *= smoothstep(1.0, 0.699999988079071044921875, edge);\n    dir += (0.180000007152557373046875 * (smoothstep(0.100000001490116119384765625, 0.20000000298023223876953125, uv.y) * smoothstep(0.4000000059604644775390625, 0.20000000298023223876953125, uv.y)));\n    dir += (0.02999999932944774627685546875 * (smoothstep(0.100000001490116119384765625, 0.20000000298023223876953125, 1.0 - uv.y) * smoothstep(0.4000000059604644775390625, 0.20000000298023223876953125, 1.0 - uv.y)));\n    dir *= (0.5 + (0.5 * pow(uv.y, 2.0)));\n    dir *= cycle_width;\n    dir -= t;\n    float refr_r = refr;\n    refr_r += ((0.02999999932944774627685546875 * bulge) * noise);\n    float refr_b = 1.2999999523162841796875 * refr;\n    refr_r += ((5.0 * (smoothstep(-0.100000001490116119384765625, 0.20000000298023223876953125, uv.y) * smoothstep(0.5, 0.100000001490116119384765625, uv.y))) * (smoothstep(0.4000000059604644775390625, 0.60000002384185791015625, bulge) * smoothstep(1.0, 0.4000000059604644775390625, bulge)));\n    refr_r -= diagonal;\n    refr_b += ((smoothstep(0.0, 0.4000000059604644775390625, uv.y) * smoothstep(0.800000011920928955078125, 0.100000001490116119384765625, uv.y)) * (smoothstep(0.4000000059604644775390625, 0.60000002384185791015625, bulge) * smoothstep(0.800000011920928955078125, 0.4000000059604644775390625, bulge)));\n    refr_b -= (0.20000000298023223876953125 * edge);\n    refr_r *= u_refraction;\n    refr_b *= u_refraction;\n    vec3 w_1 = vec3(thin_strip_1_width, thin_strip_2_width, wide_strip_ratio);\n    w_1.y -= (0.0199999995529651641845703125 * smoothstep(0.0, 1.0, edge + bulge));\n    float stripe_r = mod(dir + refr_r, 1.0);\n    float param_6 = color1.x;\n    float param_7 = color2.x;\n    float param_8 = stripe_r;\n    vec3 param_9 = w_1;\n    float param_10 = 0.0199999995529651641845703125 + ((0.02999999932944774627685546875 * u_refraction) * bulge);\n    float param_11 = bulge;\n    float _809 = FLT_flutter_local_get_color_channel(param_6, param_7, param_8, param_9, param_10, param_11);\n    float r = _809;\n    float stripe_g = mod(dir, 1.0);\n    float param_12 = color1.y;\n    float param_13 = color2.y;\n    float param_14 = stripe_g;\n    vec3 param_15 = w_1;\n    float param_16 = 0.00999999977648258209228515625 / (1.0 - diagonal);\n    float param_17 = bulge;\n    float _830 = FLT_flutter_local_get_color_channel(param_12, param_13, param_14, param_15, param_16, param_17);\n    float g = _830;\n    float stripe_b = mod(dir - refr_b, 1.0);\n    float param_18 = color1.z;\n    float param_19 = color2.z;\n    float param_20 = stripe_b;\n    vec3 param_21 = w_1;\n    float param_22 = 0.00999999977648258209228515625;\n    float param_23 = bulge;\n    float _850 = FLT_flutter_local_get_color_channel(param_18, param_19, param_20, param_21, param_22, param_23);\n    float b_1 = _850;\n    color = vec3(r, g, b_1);\n    color *= opacity;\n    fragColor = vec4(color, opacity);\n}\n\nhalf4 main(float2 iFragCoord)\n{\n      flutter_FragCoord = float4(iFragCoord, 0, 0);\n      FLT_main();\n      return fragColor;\n}\n",
    "stage": 1,
    "uniforms": [
      {
        "array_elements": 0,
        "bit_width": 32,
        "columns": 1,
        "location": 0,
        "name": "uSize",
        "rows": 2,
        "type": 10
      },
      {
        "array_elements": 0,
        "bit_width": 0,
        "columns": 1,
        "location": 1,
        "name": "u_image_texture",
        "rows": 1,
        "type": 12
      },
      {
        "array_elements": 0,
        "bit_width": 32,
        "columns": 1,
        "location": 2,
        "name": "u_time",
        "rows": 1,
        "type": 10
      },
      {
        "array_elements": 0,
        "bit_width": 32,
        "columns": 1,
        "location": 3,
        "name": "u_ratio",
        "rows": 1,
        "type": 10
      },
      {
        "array_elements": 0,
        "bit_width": 32,
        "columns": 1,
        "location": 4,
        "name": "u_img_ratio",
        "rows": 1,
        "type": 10
      },
      {
        "array_elements": 0,
        "bit_width": 32,
        "columns": 1,
        "location": 5,
        "name": "u_patternScale",
        "rows": 1,
        "type": 10
      },
      {
        "array_elements": 0,
        "bit_width": 32,
        "columns": 1,
        "location": 6,
        "name": "u_refraction",
        "rows": 1,
        "type": 10
      },
      {
        "array_elements": 0,
        "bit_width": 32,
        "columns": 1,
        "location": 7,
        "name": "u_edge",
        "rows": 1,
        "type": 10
      },
      {
        "array_elements": 0,
        "bit_width": 32,
        "columns": 1,
        "location": 8,
        "name": "u_patternBlur",
        "rows": 1,
        "type": 10
      },
      {
        "array_elements": 0,
        "bit_width": 32,
        "columns": 1,
        "location": 9,
        "name": "u_liquid",
        "rows": 1,
        "type": 10
      }
    ]
  }
}