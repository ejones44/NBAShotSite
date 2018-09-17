package datamodel

import java.{lang => jl}

import storage.PostgresClient

final case class RawShotResponse(
                                  xCoordinate: jl.Integer,
                                  yCoordinate: jl.Integer,
                                  shotMadeFlag: jl.Integer,
                                  metadata: Seq[RawShotMetadata]
                                )

object RawShotResponse {
  def apply(shotWithPlayers: ShotWithPlayers): RawShotResponse =
    RawShotResponse(
      xCoordinate = shotWithPlayers.xCoordinate,
      yCoordinate = shotWithPlayers.yCoordinate,
      shotMadeFlag = shotWithPlayers.shotMadeFlag,
      metadata = Seq.empty //TODO pass params to set this
    )
}

final case class RawShots(params: RawShotRequest, shots: Seq[RawShotResponse])

final case class ZonedShots(total: ZonedShot, shots: Seq[ZonedShot])

final case class ZonedShotsResponse(params: FrequencyShotRequest, data: ZonedShots)

final case class ZonedShotCompare(shots1: ZonedShots, shots2: ZonedShots)

final case class ZonedShotCompareResponse(params: CompareShotRequest, data: ZonedShotCompare)

final case class ZonedShot(
                            key: String,
                            bin: String,
                            shotAttempts: Integer,
                            shotMade: Integer,
                            shotValue: Integer,
                            frequency: jl.Double
                          ) {
  def +(other: ZonedShot): ZonedShot = ZonedShot(
    key,
    bin,
    shotAttempts + other.shotAttempts,
    shotMade + other.shotMade,
    shotValue,
    if (frequency > 0) frequency else other.frequency
  )
}