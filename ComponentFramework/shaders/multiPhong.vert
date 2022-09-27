#version 450
#extension GL_ARB_separate_shader_objects : enable

layout (binding = 0) uniform UniformBufferObject {
    mat4 model;
    mat4 view;
    mat4 proj;
	vec4 lightPos[2];
} ubo;

layout (location = 0) in  vec3 inPosition;
layout (location = 1) in  vec3 inNormal;
layout (location = 2) in  vec2 inTexCoord;

layout (location = 0) out vec3 vertNormal;
layout (location = 1) out vec3 lightDir[2];
layout (location = 3) out vec3 eyeDir;
layout (location = 4) out vec2 fragTexCoord;

void main() {

	fragTexCoord = inTexCoord;
	mat3 normalMatrix = mat3(transpose(inverse(ubo.model)));
	vertNormal = normalize(normalMatrix * inNormal);
	vec3 vertPos = vec3(ubo.view * ubo.model * vec4(inPosition, 1.0));
	vec3 vertDir = normalize(vertPos);
	eyeDir = -vertDir;
	for(int i = 0; i < 2; ++i){
		lightDir[i] = normalize(vec3(ubo.lightPos[i]) - vertPos);
	}
	gl_Position = ubo.proj * ubo.view * ubo.model * vec4(inPosition, 1.0);
}
