#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(binding = 1) uniform sampler2D texSampler;

layout(location = 0) out vec4 fragColor;

layout(location = 0) in  vec3 vertNormal;
layout(location = 1) in  vec3 lightDir[2];
layout(location = 3) in  vec3 eyeDir;
layout(location = 4) in  vec2 fragTexCoord;

void main() {
	vec4 kt = texture(texSampler, fragTexCoord);
	const vec4 kd[2] = vec4[2](vec4(0.8, 0.8, 0.3, 0.0),
	vec4(0.3, 0.8, 0.8, 0.0));
	vec4 ks[2];
	for(int i = 0; i < 2; i++){
		ks[i] = 0.5 * kd[i];
	}

	vec4 ka = 0.1 * kt;
	float diff[2];
	vec3 reflection[2];
	float spec[2];
	for(int i = 0; i < 2; i++){
		diff[i] = max(dot(vertNormal, lightDir[i]), 0.0);
		reflection[i] = normalize(reflect(-lightDir[i], vertNormal));
		spec[i] = max(dot(eyeDir, reflection[i]), 0.0);
		spec[i] = pow(spec[i], 14.0);
	}
	vec4 color = ka;
	for(int i = 0; i < 2; i++){
		color += (diff[i] * kt * kd[i]) + (spec[i] * ks[i]);
		fragColor = color;
	}
} 
