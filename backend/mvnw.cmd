@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    https://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM ----------------------------------------------------------------------------
@REM Maven Start Up Batch script
@REM
@REM Required ENV vars:
@REM JAVA_HOME - location of a JDK home dir
@REM
@REM Optional ENV vars
@REM MAVEN_BATCH_ECHO - set to 'on' to enable the echoing of the batch commands
@REM MAVEN_BATCH_PAUSE - set to 'on' to wait for a key stroke before ending
@REM MAVEN_OPTS - parameters passed to the Java VM when running Maven
@REM     e.g. to debug Maven itself, use
@REM set MAVEN_OPTS=-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=8000
@REM MAVEN_SKIP_RC - flag to disable loading of mavenrc files
@REM ----------------------------------------------------------------------------

@echo off
@setlocal

set ERROR_CODE=0

@REM To isolate internal variables from possible pre-existing env vars,
@REM we will prefix them with a dot.
set .MAVEN_PROJECT_BASEDIR=%~dp0
if not "%MAVEN_PROJECT_BASEDIR%"=="" set .MAVEN_PROJECT_BASEDIR=%MAVEN_PROJECT_BASEDIR%

@REM set .JAVA_HOME=%JAVA_HOME%
@REM if not "%.JAVA_HOME%"=="" goto gotJavaHome

@REM :gotJavaHome
@REM if exist "%.JAVA_HOME%\bin\java.exe" goto okJava

@REM echo.
@REM echo Error: JAVA_HOME is set to an invalid directory. >&2
@REM echo JAVA_HOME = "%.JAVA_HOME%" >&2
@REM echo Please set the JAVA_HOME variable in your environment to match the >&2
@REM echo location of your Java installation. >&2
@REM goto error

:okJava
set .JAVA_EXE=java.exe

set .MAVEN_WRAPPER_JAR="%~dp0.mvn\wrapper\maven-wrapper.jar"
set .MAVEN_WRAPPER_PROPERTIES="%~dp0.mvn\wrapper\maven-wrapper.properties"
set .MAVEN_WRAPPER_MAIN_CLASS=org.apache.maven.wrapper.MavenWrapperMain

if not exist %.MAVEN_WRAPPER_JAR% (
    echo Couldn't find %.MAVEN_WRAPPER_JAR%, please download it.
    goto error
)

%.JAVA_EXE% %MAVEN_OPTS% -classpath %.MAVEN_WRAPPER_JAR% "-Dmaven.multiModuleProjectDirectory=%.MAVEN_PROJECT_BASEDIR%" %.MAVEN_WRAPPER_MAIN_CLASS% %*
if ERRORLEVEL 1 goto error
goto end

:error
set ERROR_CODE=1

:end
@endlocal & set ERROR_CODE=%ERROR_CODE%
exit /B %ERROR_CODE%
