@@ .. @@
   const getQualityIcon = (type) => {
     switch (type) {
       case 'hdr':
         return <Award className="w-8 h-8 text-white" />;
       case '4k-dv':
         return <Zap className="w-8 h-8 text-white" />;
       case 'blu-ray':
         return <Disc className="w-8 h-8 text-white" />;
       case 'imax':
         return <Award className="w-8 h-8 text-white" />;
+      case 'songs':
+        return <HardDrive className="w-8 h-8 text-white" />;
+      case '60fps':
+        return <Zap className="w-8 h-8 text-white" />;
+      case '144fps':
+        return <Zap className="w-8 h-8 text-white" />;
       default:
         return <HardDrive className="w-8 h-8 text-white" />;
     }
   };