# ProGuard rules for WanBitha App

# Kotlin Serialization
-keepattributes *Annotation*, InnerClasses
-dontnote kotlinx.serialization.AnnotationsKt
-keepclassmembers class kotlinx.serialization.json.** {
    *** Companion;
}
-keepclasseswithmembers class kotlinx.serialization.json.** {
    kotlinx.serialization.KSerializer serializer(...);
}
-keep,includedescriptorclasses class com.wanbitha.app.**$$serializer { *; }
-keepclassmembers class com.wanbitha.app.** {
    *** Companion;
}
-keepclasseswithmembers class com.wanbitha.app.** {
    kotlinx.serialization.KSerializer serializer(...);
}

# Coil
-keep class coil3.** { *; }

# Hilt
-keep class dagger.hilt.** { *; }
-keep class javax.inject.** { *; }
-keep class * extends dagger.hilt.android.internal.managers.ViewComponentManager$FragmentContextWrapper { *; }
