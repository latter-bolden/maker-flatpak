"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.flatpakArch = flatpakArch;
exports.default = void 0;
var _makerBase = _interopRequireDefault(require("@electron-forge/maker-base"));
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function flatpakArch(nodeArch) {
    switch(nodeArch){
        case 'ia32':
            return 'i386';
        case 'x64':
            return 'x86_64';
        case 'armv7l':
            return 'arm';
        // arm => arm
        default:
            return nodeArch;
    }
}
class MakerFlatpak extends _makerBase.default {
    isSupportedOnCurrentPlatform() {
        return true; // does this work?
    }
    async make({ dir , makeDir , targetArch  }) {
        // eslint-disable-next-line global-require, import/no-unresolved, node/no-missing-require
        const installer = require('latterbolden/electron-installer-flatpak');
        const arch = flatpakArch(targetArch);
        const outDir = _path.default.resolve(makeDir, 'flatpak', arch);
        await this.ensureDirectory(outDir);
        const flatpakConfig = {
            ...this.config,
            arch,
            src: dir,
            dest: outDir
        };
        await installer(flatpakConfig);
        return (await _fsExtra.default.readdir(outDir)).filter((basename)=>basename.endsWith('.flatpak')
        ).map((basename)=>_path.default.join(outDir, basename)
        );
    }
    constructor(...args){
        super(...args);
        this.name = 'flatpak';
        this.defaultPlatforms = [
            'linux'
        ];
        this.requiredExternalBinaries = [
            'flatpak-builder',
            'eu-strip'
        ];
    }
}
exports.default = MakerFlatpak;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NYWtlckZsYXRwYWsudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1ha2VyQmFzZSwgeyBNYWtlck9wdGlvbnMgfSBmcm9tICdAZWxlY3Ryb24tZm9yZ2UvbWFrZXItYmFzZSc7XG5pbXBvcnQgeyBGb3JnZUFyY2gsIEZvcmdlUGxhdGZvcm0gfSBmcm9tICdAZWxlY3Ryb24tZm9yZ2Uvc2hhcmVkLXR5cGVzJztcblxuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgeyBNYWtlckZsYXRwYWtDb25maWcgfSBmcm9tICcuL0NvbmZpZyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0cGFrQXJjaChub2RlQXJjaDogRm9yZ2VBcmNoKTogc3RyaW5nIHtcbiAgc3dpdGNoIChub2RlQXJjaCkge1xuICAgIGNhc2UgJ2lhMzInOlxuICAgICAgcmV0dXJuICdpMzg2JztcbiAgICBjYXNlICd4NjQnOlxuICAgICAgcmV0dXJuICd4ODZfNjQnO1xuICAgIGNhc2UgJ2FybXY3bCc6XG4gICAgICByZXR1cm4gJ2FybSc7XG4gICAgLy8gYXJtID0+IGFybVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbm9kZUFyY2g7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFrZXJGbGF0cGFrIGV4dGVuZHMgTWFrZXJCYXNlPE1ha2VyRmxhdHBha0NvbmZpZz4ge1xuICBuYW1lID0gJ2ZsYXRwYWsnO1xuXG4gIGRlZmF1bHRQbGF0Zm9ybXM6IEZvcmdlUGxhdGZvcm1bXSA9IFsnbGludXgnXTtcblxuICByZXF1aXJlZEV4dGVybmFsQmluYXJpZXM6IHN0cmluZ1tdID0gWydmbGF0cGFrLWJ1aWxkZXInLCAnZXUtc3RyaXAnXTtcblxuICBpc1N1cHBvcnRlZE9uQ3VycmVudFBsYXRmb3JtKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlOyAvLyBkb2VzIHRoaXMgd29yaz9cbiAgfVxuXG4gIGFzeW5jIG1ha2UoeyBkaXIsIG1ha2VEaXIsIHRhcmdldEFyY2ggfTogTWFrZXJPcHRpb25zKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBnbG9iYWwtcmVxdWlyZSwgaW1wb3J0L25vLXVucmVzb2x2ZWQsIG5vZGUvbm8tbWlzc2luZy1yZXF1aXJlXG4gICAgY29uc3QgaW5zdGFsbGVyID0gcmVxdWlyZSgnbGF0dGVyYm9sZGVuL2VsZWN0cm9uLWluc3RhbGxlci1mbGF0cGFrJyk7XG5cbiAgICBjb25zdCBhcmNoID0gZmxhdHBha0FyY2godGFyZ2V0QXJjaCk7XG4gICAgY29uc3Qgb3V0RGlyID0gcGF0aC5yZXNvbHZlKG1ha2VEaXIsICdmbGF0cGFrJywgYXJjaCk7XG5cbiAgICBhd2FpdCB0aGlzLmVuc3VyZURpcmVjdG9yeShvdXREaXIpO1xuICAgIGNvbnN0IGZsYXRwYWtDb25maWcgPSB7XG4gICAgICAuLi50aGlzLmNvbmZpZyxcbiAgICAgIGFyY2gsXG4gICAgICBzcmM6IGRpcixcbiAgICAgIGRlc3Q6IG91dERpcixcbiAgICB9O1xuXG4gICAgYXdhaXQgaW5zdGFsbGVyKGZsYXRwYWtDb25maWcpO1xuXG4gICAgcmV0dXJuIChhd2FpdCBmcy5yZWFkZGlyKG91dERpcikpLmZpbHRlcigoYmFzZW5hbWUpID0+IGJhc2VuYW1lLmVuZHNXaXRoKCcuZmxhdHBhaycpKS5tYXAoKGJhc2VuYW1lKSA9PiBwYXRoLmpvaW4ob3V0RGlyLCBiYXNlbmFtZSkpO1xuICB9XG59XG4iXSwibmFtZXMiOlsiZmxhdHBha0FyY2giLCJub2RlQXJjaCIsIk1ha2VyRmxhdHBhayIsIk1ha2VyQmFzZSIsImlzU3VwcG9ydGVkT25DdXJyZW50UGxhdGZvcm0iLCJtYWtlIiwiZGlyIiwibWFrZURpciIsInRhcmdldEFyY2giLCJpbnN0YWxsZXIiLCJyZXF1aXJlIiwiYXJjaCIsIm91dERpciIsInBhdGgiLCJyZXNvbHZlIiwiZW5zdXJlRGlyZWN0b3J5IiwiZmxhdHBha0NvbmZpZyIsImNvbmZpZyIsInNyYyIsImRlc3QiLCJmcyIsInJlYWRkaXIiLCJmaWx0ZXIiLCJiYXNlbmFtZSIsImVuZHNXaXRoIiwibWFwIiwiam9pbiIsIm5hbWUiLCJkZWZhdWx0UGxhdGZvcm1zIiwicmVxdWlyZWRFeHRlcm5hbEJpbmFyaWVzIl0sIm1hcHBpbmdzIjoiOzs7O1FBUWdCQSxXQUFXLEdBQVhBLFdBQVc7O0FBUmEsR0FBNEIsQ0FBNUIsVUFBNEI7QUFHckQsR0FBVSxDQUFWLFFBQVU7QUFDUixHQUFNLENBQU4sS0FBTTs7Ozs7O1NBSVBBLFdBQVcsQ0FBQ0MsUUFBbUIsRUFBVSxDQUFDO0lBQ3hELE1BQU0sQ0FBRUEsUUFBUTtRQUNkLElBQUksQ0FBQyxDQUFNO1lBQ1QsTUFBTSxDQUFDLENBQU07UUFDZixJQUFJLENBQUMsQ0FBSztZQUNSLE1BQU0sQ0FBQyxDQUFRO1FBQ2pCLElBQUksQ0FBQyxDQUFRO1lBQ1gsTUFBTSxDQUFDLENBQUs7UUFDZCxFQUFhLEFBQWIsV0FBYTs7WUFFWCxNQUFNLENBQUNBLFFBQVE7O0FBRXJCLENBQUM7TUFFb0JDLFlBQVksU0FBU0MsVUFBUztJQU9qREMsNEJBQTRCLEdBQVksQ0FBQztRQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFFLENBQWtCLEFBQWxCLEVBQWtCLEFBQWxCLGdCQUFrQjtJQUNqQyxDQUFDO1VBRUtDLElBQUksQ0FBQyxDQUFDLENBQUNDLEdBQUcsR0FBRUMsT0FBTyxHQUFFQyxVQUFVLEVBQWUsQ0FBQyxFQUFxQixDQUFDO1FBQ3pFLEVBQXlGLEFBQXpGLHVGQUF5RjtRQUN6RixLQUFLLENBQUNDLFNBQVMsR0FBR0MsT0FBTyxDQUFDLENBQXlDO1FBRW5FLEtBQUssQ0FBQ0MsSUFBSSxHQUFHWCxXQUFXLENBQUNRLFVBQVU7UUFDbkMsS0FBSyxDQUFDSSxNQUFNLEdBQUdDLEtBQUksU0FBQ0MsT0FBTyxDQUFDUCxPQUFPLEVBQUUsQ0FBUyxVQUFFSSxJQUFJO1FBRXBELEtBQUssQ0FBQyxJQUFJLENBQUNJLGVBQWUsQ0FBQ0gsTUFBTTtRQUNqQyxLQUFLLENBQUNJLGFBQWEsR0FBRyxDQUFDO2VBQ2xCLElBQUksQ0FBQ0MsTUFBTTtZQUNkTixJQUFJO1lBQ0pPLEdBQUcsRUFBRVosR0FBRztZQUNSYSxJQUFJLEVBQUVQLE1BQU07UUFDZCxDQUFDO1FBRUQsS0FBSyxDQUFDSCxTQUFTLENBQUNPLGFBQWE7UUFFN0IsTUFBTSxFQUFFLEtBQUssQ0FBQ0ksUUFBRSxTQUFDQyxPQUFPLENBQUNULE1BQU0sR0FBR1UsTUFBTSxFQUFFQyxRQUFRLEdBQUtBLFFBQVEsQ0FBQ0MsUUFBUSxDQUFDLENBQVU7VUFBR0MsR0FBRyxFQUFFRixRQUFRLEdBQUtWLEtBQUksU0FBQ2EsSUFBSSxDQUFDZCxNQUFNLEVBQUVXLFFBQVE7O0lBQ3BJLENBQUM7OztRQTdCWSxJQThCZCxDQTdCQ0ksSUFBSSxHQUFHLENBQVM7UUFESCxJQThCZCxDQTNCQ0MsZ0JBQWdCLEdBQW9CLENBQUM7WUFBQSxDQUFPO1FBQUEsQ0FBQztRQUhoQyxJQThCZCxDQXpCQ0Msd0JBQXdCLEdBQWEsQ0FBQztZQUFBLENBQWlCO1lBQUUsQ0FBVTtRQUFBLENBQUM7OztrQkFMakQzQixZQUFZIn0=